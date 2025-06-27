'use client'

import { useState, useEffect } from "react"
import { getUserWorkouts, type Workout } from "@/lib/workoutOperations"

//callback to refresh workout list
type CreateQuickStatsProp = {
    refreshTrigger?: number;
};


function QuickStats({ refreshTrigger }: CreateQuickStatsProp) {
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

    //automatically load the workouts using workout fetching function
    useEffect(() => {
        fetchWorkouts();
    }, [refreshTrigger])


    if (isLoading) return (
        <div className='flex flex-col items-center  min-h-screen p-8 gap-16 sm:p-20'>
            <div className="bg-white border border-black rounded-lg p-8 shadow-xl">
                <div className="animate-pulse text-xl font-semibold">Loading your workouts...</div>
            </div>
        </div>
    );

    if (error) {
        return (
            <div className="text-center text-red-600">
                Error: {error}
                <button onClick={fetchWorkouts} className="btn btn-ghost ml-2">Retry</button>
            </div>
        );
    }

    const totalWorkouts = workouts.length;
    const totalMinutes = workouts.reduce((sum, w) => sum + Number(w.duration_minutes), 0);
    const workoutAvg = totalWorkouts > 0 ? Math.round(totalMinutes / totalWorkouts) : 0;

    return (
        <div className="max-w-7xl mx-auto mt-8">
            <div className="bg-white border border-black rounded-lg p-6 shadow-xl">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <div className="w-3 h-3 bg-black rounded-full"></div>
                    QUICK STATS
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-neutral-300 border border-black rounded-lg p-4">
                        <div className="text-center">
                            <div className="text-2xl font-bold">{totalWorkouts}</div>
                            <div className="text-sm text-neutral-600">Total Workouts</div>
                        </div>
                    </div>
                    <div className="bg-neutral-300 border border-black rounded-lg p-4">
                        <div className="text-center">
                            <div className="text-2xl font-bold">{totalMinutes}</div>
                            <div className="text-sm text-neutral-600">Total Minutes</div>
                        </div>
                    </div>
                    <div className="bg-neutral-300 border border-black rounded-lg p-4">
                        <div className="text-center">
                            <div className="text-2xl font-bold">{workoutAvg}</div>
                            <div className="text-sm text-neutral-600">Average Duration</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default QuickStats