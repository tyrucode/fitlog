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
    created_at?: string
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
                duration_minutes: workout.duration_minutes,
                created_at: workout.created_at || new Date()
            }
        ])
        .select();

    if (error) {
        throw new Error('error creating workout', error);
    }
    return data;
}

//function that retrieves all of the users workouts
export const getUserWorkouts = async () => {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        console.log('user not authenticated');
        throw new Error('user not authenticated');
    }

    const { data, error } = await supabase
        .from('workouts')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

    if (error) {
        throw new Error('error creating workout', error);
    }

    return data as Workout[];
}
//function to delete a workout
export const deleteWorkout = async (workoutId: number) => {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        console.log('user not authenticated');
        throw new Error('user not authenticated');
    }

    const { error } = await supabase
        .from('workouts')
        .delete()
        .eq('id', workoutId)
        .eq('user_id', user.id);

    if (error) {
        throw new Error('error deleting workout', error);
    }
}
//in the future add a function to edit workouts