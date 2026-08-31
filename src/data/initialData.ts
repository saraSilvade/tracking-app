
import type { UserProfile } from "../types"
import type { Habits } from "../types"
import type { Dailies } from "../types"

export const initialUser: UserProfile = {
name: 'IrisSun',
email: 'iris22@gmail.com', 
avatar: '⚔️',
level: 3, 
lvlIcon: '⚜️',
exp: 15,
expMax:20,
gold: 100,
gems: 200,
tro: 40,
}



export const initialHabits: Habits[] = [
    {id: '1', title: 'Meditate', icon: '🧘', count: 3, target: 30,  unit: 'Minutes', accentColor: '#ffa6ef', countPerTap: 5}, 
    {id: '3', title: 'read 30 minutes', icon: '📖', count: 2, target: 15,  unit: 'Pages', accentColor: '#a6edff', countPerTap: 15}

]


export const initialDailies: Dailies[] = [
    
    { id: 'd1', title: 'Morning Standup', icon: '☀️', completed: true, streakDays: 12 },
  { id: 'd2', title: 'Review Code Logs', icon: '📋', completed: true, streakDays: 5 }


]