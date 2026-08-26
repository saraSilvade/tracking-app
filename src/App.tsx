import React, { useState, useEffect } from 'react';
import { onAuthStateChanged, signOut, type User } from 'firebase/auth';
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
import HabitsCol from './components/HabitsCol'


export default function App() {

  const [firebaseUser, setFirebaseUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<UserProfile>(initialUser);
  const [habit, setHabit] = useState<Habits[]>(initialHabits);
  const [daily, setDaily] = useState<Dailies[]>(initialDailies);


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
  item.id === id? {...item, count: item.count + 1} : item
  )

)

}

//Decrease the habits with - button

const decrementFunction = (id:string) =>{

  setHabit((prevHabits) => 
  prevHabits.map((item)=> 
  item.id === id ? {...item, count: Math.max(0, item.count -1)} : item))
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
          <button
            onClick={() => signOut(auth)}
            className="text-xs font-mono text-text-muted hover:text-white border border-glass-border px-3 py-1 rounded-lg cursor-pointer"
          >
            Logout 
          </button>
        </div>
   
  <UserProfileBanner user={user} />
  <DashboardSubHeader/>



<div className='flex justify-around'>
  <HabitsCol habits={habit} habitIncrement={incrementFunction} 
  habitDecrement={decrementFunction}/>
<DailiesCol  dailies={daily} 
onChecked={checkedDailiesBox}  />
</div>


      </div>

    </div>
  );
}