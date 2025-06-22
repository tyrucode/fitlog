import supabase from "./supabase";

//workout types
export type Workout = {
    id: number,
    exercise_name: string,
    duration_minutes: number,
    created_at: string;
}
//new workout input 
export type NewWorkout = {
    exercise_name: string;
    duration_minutes: number;
}
//function that creates the new workout

//function that retrieves all of the users workouts

//function to delete a workout

//in the future add a function to edit workouts