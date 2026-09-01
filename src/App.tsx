import React, { useState, useEffect } from 'react';
import { onAuthStateChanged,  type User } from 'firebase/auth';
import {doc, onSnapshot, setDoc} from 'firebase/firestore'
import { db } from './firebase';
import { auth } from './firebase';
import { initialUser } from './data/initialData';
import type { UserProfile } from './types';
import {initialHabits} from './data/initialData'
import UserProfileBanner from './components/UserBanner';
import Header from './components/Header';
import { initialDailies } from './data/initialData';
import type  { Habits } from './types';
import type { Dailies } from './types';
import UserAuth from './components/UserAuthModal';
import DashboardSubHeader from './components/DashboardSubHeader';
import DailiesCol from './components/DailiesCol';
import LogoutButton from './components/LogoutButton';
import HabitModal from './components/HabitsModal';
import HabitsCol from './components/HabitsCol';
import DailyModal from './components/DailyModal';
import DeleteConfirmationModal from './components/DeleteConfirmationModal';

export default function App() {

  const [firebaseUser, setFirebaseUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<UserProfile>(initialUser);
  const [habit, setHabit] = useState<Habits[]>(initialHabits);
  const [daily, setDaily] = useState<Dailies[]>(initialDailies);

  const [isHabitModalOpen, setIsHabitModalOpen] = useState(false);
  const [editingHabit, setEditingHabit] = useState <Habits | null> (null);
//  Daily Modal States
const [isDailyModalOpen, setIsDailyModalOpen] = useState(false);
const [editingDaily, setEditingDaily] = useState<Dailies | null>(null);

// Delete Confirmation state
const [confirmDelete, setConfirmDelete] = useState <{ id: string; title: string; type: 'habit' | 'daily' } | null>(null);
//  Handlers
const handleDeleteDaily = (id: string) => {
  setDaily((prev) => prev.filter((item) => item.id !== id));
};

const handleOpenAddDaily = () => {
  setEditingDaily(null);
  setIsDailyModalOpen(true);
};

const handleOpenEditDaily = (dailyToEdit: Dailies) => {
  setEditingDaily(dailyToEdit);
  setIsDailyModalOpen(true);
};

const handleSaveDaily = (dailyData: Omit<Dailies, 'id' | 'completed'> | Dailies) => {
  if (editingDaily) {
    setDaily((prev) =>
      prev.map((item) =>
        item.id === editingDaily.id ? { ...editingDaily, ...dailyData } : item
      )
    );
  } else {
    const newDaily: Dailies = {
      ...(dailyData as Omit<Dailies, 'id' | 'completed'>),
      id: crypto.randomUUID(),
      completed: false
    };
    setDaily((prev) => [...prev, newDaily]);
  }
};
useEffect(() =>{
  const unsubscribe = onAuthStateChanged(auth, (currentUser)=> {
    setFirebaseUser(currentUser);

    if(currentUser?.displayName){
      setUser((prev) => ({...prev , name: currentUser.displayName as string}));

    }
    setLoading(false);
  });
return() => unsubscribe();
}, [])



// Increase the habit with + button
const incrementFunction = (id : string) =>{

setHabit((prevHabits) => 

  prevHabits.map((item) => 
  item.id === id? {...item, count: item.count + (item.countPerTap|| 1)} : item
  )

)

}

//Decrease the habits with - button

const decrementFunction = (id:string) =>{

  setHabit((prevHabits) => 
  prevHabits.map((item)=> 
  item.id === id ? {...item, count: Math.max(0, item.count - (item.countPerTap || 1))} : item))
}






// A helper function to delete after user confirmation

const triggerHabitDelete = (id: string) => {
  const target = habit.find((h) => h.id === id);
  if (target) setConfirmDelete({ id: target.id, title: target.title, type: 'habit' });
};

const triggerDailyDelete = (id: string) => {
  const target = daily.find((d) => d.id === id);
  if (target) setConfirmDelete({ id: target.id, title: target.title, type: 'daily' });
};

// handle delete confirmation, Delete an existing habit
const confirmBeforeDelete = ()=>{
  if(!confirmDelete) return null;

if (confirmDelete.type === 'habit') {
      const updated = habit.filter((h) => h.id !== confirmDelete.id);
      setHabit(updated);
     
    } else {
      const updated = daily.filter((d) => d.id !== confirmDelete.id);
      setDaily(updated);
  
    }
    setConfirmDelete(null);
}


// Add New Habit modal 
const addNewHabit = ()=>{
  setEditingHabit(null);
  setIsHabitModalOpen(true);
}

// Open Edit Modal
 const handleOpenEditModal = (habitToEdit: Habits) => {
    setEditingHabit(habitToEdit);
    setIsHabitModalOpen(true);
  };
  
// Create or update and save new habit 
const handleSaveHabit = (habitsData : Omit< Habits, 'id' | 'count'> | Habits)=>{
  // This line is for editing an existing habit
  if(editingHabit){
    setHabit((prev) => prev.map((item)=> item.id === editingHabit.id? {...editingHabit , ...habitsData}: item
  ))
  }else{
    // This line is for creating a new habit
    const newHabit : Habits = {
      ...(habitsData as Omit< Habits, 'id' | 'count' >), 
      id: crypto.randomUUID(), 
      count : 0
    };
    setHabit((prev) => [...prev, newHabit]);
  }

}

// checked/unchecked dailies
const checkedDailiesBox = (id:string) =>{

  setDaily((prevDaily) => 
  prevDaily.map((item) => item.id === id? {...item, completed : !item.completed}: item))
}


 if(loading){
  return(
    <div className="min-h-screen bg-app-bg text-text-main flex items-center justify-center font-mono">
        Loading Realm...
      </div>
  )
 }
 
if(!firebaseUser){
return(
    <UserAuth/>
)
}





  return (
    <div className="min-h-screen bg-app-bg text-text-main p-6 font-sans">
      <div className="max-w-7xl mx-auto">
   <div className="flex justify-between items-center mb-4">
          <Header />
       <LogoutButton/>
        </div>
   
  <UserProfileBanner user={user} />
  <DashboardSubHeader/>



<div className='flex justify-around'>
  <HabitsCol habits={habit} 
  habitIncrement={incrementFunction} 
  habitDecrement={decrementFunction}
  onDelete={triggerHabitDelete}
  onOpenAddModal={addNewHabit}
  onEdit={handleOpenEditModal}
  
  />
<DailiesCol  dailies={daily} 
onChecked={checkedDailiesBox}
onDelete={triggerDailyDelete}
onEdit={handleOpenEditDaily}
onOpenAddModal={handleOpenAddDaily}
  />
</div>


      </div>
<HabitModal isOpen={isHabitModalOpen}
        onClose={() => setIsHabitModalOpen(false)}
        onSave={handleSaveHabit}
        initialData={editingHabit}/>



    <div>
      <DailyModal onSave={handleSaveDaily} isOpen={isDailyModalOpen}  onClose={ () => setIsDailyModalOpen (false)} initialData={editingDaily} />
    </div>

<DeleteConfirmationModal
isOpen={confirmDelete !== null}
title={confirmDelete?.title || ''}
onConfirm={confirmBeforeDelete}
onCancel={()=> setConfirmDelete(null)}
/>
    </div>

  );
}