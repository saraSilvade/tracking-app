
import type { UserProfile } from "../types"
import type { Habits } from "../types"
import type { Dailies } from "../types"

//This is a mocked data to test the UI before connecting real-time user data
export const initialUser: UserProfile = {
name: 'IrisSun',
email: 'iris22@gmail.com', 
avatar: '⚔️',
level: 0, 
lvlIcon: '⚜️',
exp: 0,
expMax:0,
gold: 0,
gems: 0,
tro: 0,
isOnline: false,
title: ''
}



export const initialHabits: Habits[] = [
    {id: '1', title: 'Meditate', icon: '🧘', count: 3, target: 30,  unit: 'Minutes', accentColor: '#ffa6ef', countPerTap: 5}, 
    {id: '3', title: 'read 30 minutes', icon: '📖', count: 2, target: 15,  unit: 'Pages', accentColor: '#a6edff', countPerTap: 15}

]


export const initialDailies: Dailies[] = [
    
    { id: 'd1', title: 'Morning Standup', icon: '☀️', completed: true, streakDays: 12 },
  { id: 'd2', title: 'Review Code Logs', icon: '📋', completed: true, streakDays: 5 }


]