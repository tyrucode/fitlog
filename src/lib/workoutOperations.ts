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
export const createWorkout = async (workout: NewWorkout) => {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        console.log('user not authenticated');
        throw new Error('user not authenticated');
    }

    const { data, error } = await supabase
        .from('workouts')
        .insert([
            {
                user_id: user.id,
                exercise_name: workout.exercise_name,
                duration_minutes: workout.duration_minutes
            }
        ])
        .select();

    if (error) {
        throw new Error('error creating workout', error);
    }
    return data;
}
//function that retrieves all of the users workouts

//function to delete a workout

//in the future add a function to edit workouts