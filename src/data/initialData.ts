
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
    {id: '1', title: 'Meditate', icon: '🧘', count: 3}, 
    {id: '2', title: 'Exercise', icon: '🏃', count: 5}, 
    {id: '3', title: 'read 30 minutes', icon: '📖', count: 2}

]


export const initialDailies: Dailies[] = [
    
    { id: 'd1', title: 'Morning Standup', icon: '☀️', completed: true, streak: 12 },
  { id: 'd2', title: 'Review Code Logs', icon: '📋', completed: true, streak: 5 },
  { id: 'd3', title: 'Evening Reflection', icon: '🌙', completed: false, streak: 3 },
  { id: 'd4', title: '30-min Deep Focus', icon: '🔮', completed: false, streak: 8 },
]