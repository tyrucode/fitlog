"use client"
import { useState, useEffect } from "react"
import { getUserWorkouts, deleteWorkout, type Workout } from "@/lib/workoutOperations"

//callback to refresh workout list
type WorkoutListProps = {
    refreshTrigger?: number;
}

function WorkoutList({ refreshTrigger }: WorkoutListProps) {
    //array of workouts
    const [workouts, setWorkouts] = useState<Workout[]>([]);
    //load state
    const [isLoading, setIsLoading] = useState(true);
    //error either null or the name of the error itself
    const [error, setError] = useState<string | null>(null);

    const fetchWorkouts = async () => {
        try {
            setIsLoading(true);
            setError(null);
            const data = await getUserWorkouts();
            //sending our workouts to our state as an array to be mapped to our dom
            setWorkouts(data);
        } catch (e) {
            console.log('there was an error:', e)
            setError('Failed to create workout, please try again.');
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchWorkouts();
    }, [refreshTrigger])

    const handleDelete = async (workoutId: number) => {
        try {
            deleteWorkout(workoutId);
            setWorkouts(workouts.filter(workout => workout.id !== workoutId)); //making workout arrays exclude the workouts we delete
        } catch (e) {
            console.log('there was an error:', e)
            setError('Failed to delete workout, please try again.');
        } finally {
            setIsLoading(false);
        }
    }

    //formatting the data so it can be displayed properly
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    if (isLoading) {
        return <div className="text-center text-bold">Loading workouts...</div>
    }

    if (error) {
        return (
            <div className="text-center text-red-600">
                Error: {error}
                <button onClick={fetchWorkouts} className="btn btn-ghost ml-2">Retry</button>
            </div>
        );
    }

    return (
        <div className="w-full max-w-4xl">
            <h2 className="text-xl font-semibold mb-4">Your Workouts</h2>
            {/* if no workouts display this */}
            {workouts.length === 0 ? (
                <div className="text-center text-black p-8">
                    <p>No workouts yet. Create your first workout above!</p>
                </div>
            ) : (
                // if available workouts display this
                <div className="grid gap-4">

                </div>
            )}

        </div>
    )
}

export default WorkoutList