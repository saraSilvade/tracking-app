

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
    count: number;
   
}

//Dailies data types
export interface Dailies {
    id: string; 
    title: string;
    icon:string;
    streak:number; 
    completed: boolean;
}