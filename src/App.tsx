import React, { useState, useEffect } from 'react';
import { onAuthStateChanged, type User } from 'firebase/auth';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';

// Firebase Config
import { db, auth } from './firebase';

// Data and Types
import { initialUser, initialHabits, initialDailies } from './data/initialData';
import type { UserProfile, Habits, Dailies } from './types';

// Components
import Header from './components/Header';
import LogoutButton from './components/LogoutButton';
import UserProfileBanner from './components/UserBanner';
import DashboardSubHeader from './components/DashboardSubHeader';
import HabitsCol from './components/HabitsCol';
import DailiesCol from './components/DailiesCol';
import HabitModal from './components/HabitsModal';
import DailyModal from './components/DailyModal';
import DeleteConfirmationModal from './components/DeleteConfirmationModal';
import UserAuth from './components/UserAuthModal';
import AvatarModal from './components/UserAvatarModal';

export default function App() {
  
  //  States Management 

  
  // Auth and Loading States
  const [firebaseUser, setFirebaseUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // App Data States
  const [user, setUser] = useState<UserProfile>(initialUser);
  const [habit, setHabit] = useState<Habits[]>(initialHabits);
  const [daily, setDaily] = useState<Dailies[]>(initialDailies);

  // Modal States Habits and Dailies
  const [isHabitModalOpen, setIsHabitModalOpen] = useState(false);
  const [editingHabit, setEditingHabit] = useState<Habits | null>(null);

  const [isDailyModalOpen, setIsDailyModalOpen] = useState(false);
  const [editingDaily, setEditingDaily] = useState<Dailies | null>(null);

  // Delete Confirmation Modal State
  const [confirmDelete, setConfirmDelete] = useState<{
    id: string;
    title: string;
    type: 'habit' | 'daily';
  } | null>(null);
 // Avatar Modal state 
 const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);

  // ---------------------------------------------------------------------------
  // Firebase Real Time Subscription 

 const handleSelectAvatar = async (newAvatar: string) => {
  if (!firebaseUser) return;

  const updatedUser = { ...user, avatar: newAvatar };
  setUser(updatedUser);

  // Save profile update directly
  try {
    const userDocRef = doc(db, 'users', firebaseUser.uid);
    await setDoc(userDocRef, { profile: updatedUser }, { merge: true });
  } catch (error) {
    console.error('Error updating avatar:', error);
  }
};

  // Listens to Auth changes and syncs Firestore document in real-time
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      setFirebaseUser(currentUser);

      if (currentUser?.displayName) {
        setUser((prev) => ({ ...prev, name: currentUser.displayName as string }));
      }

      if (currentUser) {

        // 1. Set dynamic user data directly from Firebase Auth
      const dynamicUserData: UserProfile = {
        name: currentUser.displayName || currentUser.email?.split('@')[0] || 'Adventurer',
        email: currentUser.email || '',
        avatar: currentUser.photoURL || undefined,
        isOnline: true, // Dynamic active status while session is live
        level: initialUser.level, // Preserved or pulled from Firestore below
        exp: initialUser.exp,
        expMax: initialUser.expMax,
        
      };

        const userDocRef = doc(db, 'users', currentUser.uid);
        
        // Subscribe to real time updates from user's document
        const unsubscribeSnapShot = onSnapshot(userDocRef, (docSnap) => {
          if (docSnap.exists()) {
            const data = docSnap.data();
            const profile = data.profile || {};
            setHabit(data.habits || []);
            setDaily(data.dailies || []);

            // Merge stored level/xp with live auth data
          setUser({
            
         ...initialUser,
   name: profile.name || currentUser.displayName ,
    email: currentUser.email || '',
    avatar: profile.avatar || currentUser.photoURL || initialUser.avatar || '⚔️',
    isOnline: true,
    level: profile.level ?? initialUser.level,
    lvlIcon: profile.lvlIcon || initialUser.lvlIcon || '🛡️',
    exp: profile.exp ?? initialUser.exp,
    expMax: profile.expMax ?? initialUser.expMax,
    gold: profile.gold ?? initialUser.gold,
    gems: profile.gems ?? initialUser.gems,
    tro: profile.tro ?? initialUser.tro,
           
          });

          } else {
            // Seed initial data if user has no document yet
            setDoc(userDocRef, { profile: { level: initialUser.level, exp: initialUser.exp, expMax: initialUser.expMax },habits: initialHabits, dailies: initialDailies }, { merge: true });
            setHabit(initialHabits);
            setDaily(initialDailies);
                    setUser(dynamicUserData);
          }
          setLoading(false);
        });

        return () => unsubscribeSnapShot();
      } else {
setUser({ ...initialUser, isOnline: false });
        setHabit([]);
        setDaily([]);
        setLoading(false);
      }
    });

    return () => unsubscribeAuth();
  }, []);

  // Helper function to push state updates directly to Firestore
  const saveChangesToFirestore = async (newHabit: Habits[], newDaily: Dailies[], updatedUser : UserProfile) => {
    if (!firebaseUser) return;

    try {
      const userDocRef = doc(db, 'users', firebaseUser.uid);
      await setDoc(userDocRef, { habits: newHabit, dailies: newDaily, profile: updatedUser || user }, { merge: true });
    } catch (error) {
      console.error('Error saving to Firestore:', error);
    }
  };

  // ---------------------------------------------------------------------------
  // 3. Habit Handlers


  // Increment habit counter
  const incrementFunction = (id: string) => {
    const updated = habit.map((item) =>
      item.id === id ? { ...item, count: item.count + (item.countPerTap || 1) } : item
    );
    setHabit(updated);
    saveChangesToFirestore(updated, daily);
  };

  // Decrement habit counter
  const decrementFunction = (id: string) => {
    const updated = habit.map((item) =>
      item.id === id ? { ...item, count: Math.max(0, item.count - (item.countPerTap || 1)) } : item
    );
    setHabit(updated);
    saveChangesToFirestore(updated, daily);
  };

  // Open modal to add a new habit
  const addNewHabit = () => {
    setEditingHabit(null);
    setIsHabitModalOpen(true);
  };

  // Open modal to edit an existing habit
  const handleOpenEditModal = (habitToEdit: Habits) => {
    setEditingHabit(habitToEdit);
    setIsHabitModalOpen(true);
  };

  // Save, Create or Update a habit
  const handleSaveHabit = (habitsData: Omit<Habits, 'id' | 'count'> | Habits) => {
    let updated: Habits[];
    if (editingHabit) {
      updated = habit.map((item) =>
        item.id === editingHabit.id ? { ...editingHabit, ...habitsData } : item
      );
    } else {
      const newHabit: Habits = {
        ...(habitsData as Omit<Habits, 'id' | 'count'>),
        id: crypto.randomUUID(),
        count: 0
      };
      updated = [...habit, newHabit];
    }
    setHabit(updated);
    saveChangesToFirestore(updated, daily);
  };

  // Intercept habit deletion and prompt confirmation modal
  const triggerHabitDelete = (id: string) => {
    const target = habit.find((h) => h.id === id);
    if (target) setConfirmDelete({ id: target.id, title: target.title, type: 'habit' });
  };

  // ---------------------------------------------------------------------------
  // 4. Daily task handlers
 

  // Toggle checkbox completion
  const checkedDailiesBox = (id: string) => {
    const updated = daily.map((item) =>
      item.id === id ? { ...item, completed: !item.completed } : item
    );
    setDaily(updated);
    saveChangesToFirestore(habit, updated);
  };

  // Open modal to add a new daily task
  const handleOpenAddDaily = () => {
    setEditingDaily(null);
    setIsDailyModalOpen(true);
  };

  // Open modal to edit an existing daily task
  const handleOpenEditDaily = (dailyToEdit: Dailies) => {
    setEditingDaily(dailyToEdit);
    setIsDailyModalOpen(true);
  };

  // Save, Create or Update daily task
  const handleSaveDaily = (dailyData: Omit<Dailies, 'id' | 'completed'> | Dailies) => {
    let updated: Dailies[];
    if (editingDaily) {
      updated = daily.map((item) =>
        item.id === editingDaily.id ? { ...editingDaily, ...dailyData } : item
      );
    } else {
      const newDaily: Dailies = {
        ...(dailyData as Omit<Dailies, 'id' | 'completed'>),
        id: crypto.randomUUID(),
        completed: false
      };
      updated = [...daily, newDaily];
    }
    setDaily(updated);
    saveChangesToFirestore(habit, updated);
  };

  // Intercept daily task deletion and prompt confirmation modal
  const triggerDailyDelete = (id: string) => {
    const target = daily.find((d) => d.id === id);
    if (target) setConfirmDelete({ id: target.id, title: target.title, type: 'daily' });
  };

  // ---------------------------------------------------------------------------
  // Global Delete Confirmation


  const confirmBeforeDelete = () => {
    if (!confirmDelete) return;

    if (confirmDelete.type === 'habit') {
      const updated = habit.filter((h) => h.id !== confirmDelete.id);
      setHabit(updated);
      saveChangesToFirestore(updated, daily);
    } else {
      const updated = daily.filter((d) => d.id !== confirmDelete.id);
      setDaily(updated);
      saveChangesToFirestore(habit, updated);
    }
    setConfirmDelete(null);
  };

  // ---------------------------------------------------------------------------
  //  Conditional Rendering Guard, Auth and Loading


  if (loading) {
    return (
      <div className="min-h-screen bg-app-bg text-text-main flex items-center justify-center font-mono">
        Loading Realm...
      </div>
    );
  }

  if (!firebaseUser) {
    return <UserAuth />;
  }

  // ---------------------------------------------------------------------------
  // UI RENDER


  return (
    <div className="min-h-screen bg-app-bg text-text-main p-6 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Top Bar */}
        <div className="flex justify-between items-center mb-4">
          <Header user={user} />
          <LogoutButton />
        </div>

        {/* User Banner & Sub Header */}
        <UserProfileBanner openAvatarModal={()=> setIsAvatarModalOpen(true)} user={user} />
        <DashboardSubHeader />

        {/* Main Columns Grid */}
        <div className="flex justify-around">
          <HabitsCol
            habits={habit}
            habitIncrement={incrementFunction}
            habitDecrement={decrementFunction}
            onDelete={triggerHabitDelete}
            onOpenAddModal={addNewHabit}
            onEdit={handleOpenEditModal}
          />

          <DailiesCol
            dailies={daily}
            onChecked={checkedDailiesBox}
            onDelete={triggerDailyDelete}
            onEdit={handleOpenEditDaily}
            onOpenAddModal={handleOpenAddDaily}
          />
        </div>
      </div>

      {/* Modals */}
      <HabitModal
        isOpen={isHabitModalOpen}
        onClose={() => setIsHabitModalOpen(false)}
        onSave={handleSaveHabit}
        initialData={editingHabit}
      />

      <DailyModal
        isOpen={isDailyModalOpen}
        onClose={() => setIsDailyModalOpen(false)}
        onSave={handleSaveDaily}
        initialData={editingDaily}
      />

      <DeleteConfirmationModal
        isOpen={confirmDelete !== null}
        title={confirmDelete?.title || ''}
        onConfirm={confirmBeforeDelete}
        onCancel={() => setConfirmDelete(null)}
      />



      <AvatarModal 
      isOpen={isAvatarModalOpen}
      onClose={()=> setIsAvatarModalOpen(false)}
      onSelectAvatar={handleSelectAvatar}
      currentAvatar={user.avatar}
      />
    </div>
  );
}