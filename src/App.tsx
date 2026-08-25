import React, { useState } from 'react';
import { initialUser } from './data/initialData';
import type { UserProfile } from './types';
import {initialHabits} from './data/initialData'
import UserProfileBanner from './components/UserBanner';
import Header from './components/Header';
import { initialDailies } from './data/initialData';
import type  { Habits } from './types';
import type { Dailies } from './types';
import UserAuth from './components/UserAuthModal';
import DashboardSubHeader
 from './components/DashboardSubHeader';


 import DailiesCol from './components/DailiesCol';
 
import HabitsCol from './components/HabitsCol'


export default function App() {
  const [user, setUser] = useState<UserProfile>(initialUser);
const [habit, setHabit] = useState<Habits[]> (initialHabits);
const [daily, setDaily] = useState<Dailies[]> (initialDailies);

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




  return (
    <div className="min-h-screen bg-app-bg text-text-main p-6 font-sans">
      <div className="max-w-7xl mx-auto">
     <Header/>
  <UserProfileBanner user={user} />
  <DashboardSubHeader/>
<div className='flex justify-around'>
  <HabitsCol habits={habit} habitIncrement={incrementFunction} habitDecrement={decrementFunction}/>
<DailiesCol  dailies={daily} onChecked={checkedDailiesBox}  />
</div>
      </div>
      <UserAuth/>
    </div>
  );
}