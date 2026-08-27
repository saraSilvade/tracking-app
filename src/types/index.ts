

export interface UserProfile {
    name: string;
    email: string;
    avatar: string;
    level: number;
    lvlIcon: string;
    exp: number; 
    expMax: number;
    gold: number; 
    gems: number;
    tro: number;

}

//Habits data types
export interface Habits{
id: string;
  title: string;
  icon: string;
  unit: string;
  count: number;
  target: number;
  countPerTap: number;
  accentColor: string;
   
}

//Dailies data types
export interface Dailies {
   id: string;
  title: string;
  icon: string;
  completed: boolean;
  streakDays?: number;
  note?: string;
}