'use client'

import { useState, useEffect } from "react"
import { getUserWorkouts, type Workout } from "@/lib/workoutOperations"
import { calculateStreaks, getStreakStatusMessage, getNextMilestone, type StreakData } from "@/lib/streakCalculation"

type StreakStatsProps = {
    refreshTrigger?: number;
};

function StreakStats({ refreshTrigger }: StreakStatsProps) {
    const [streakData, setStreakData] = useState<StreakData>({
        currentStreak: 0,
        longestStreak: 0,
        lastWorkoutDate: null,
        isActiveToday: false
    });
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchStreakData = async () => {
        try {
            setIsLoading(true);
            setError(null);
            const workouts = await getUserWorkouts();
            const calculatedStreaks = calculateStreaks(workouts);
            setStreakData(calculatedStreaks);
        } catch (e) {
            console.log('Error fetching streak data:', e);
            setError('Failed to load streak data');
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchStreakData();
    }, [refreshTrigger]);

    if (isLoading) {
        return (
            <div className="bg-white border border-black rounded-lg p-6 shadow-xl">
                <div className="animate-pulse">
                    <div className="h-6 bg-gray-300 rounded w-1/3 mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-white border border-black rounded-lg p-6 shadow-xl">
                <div className="text-red-600 text-center">
                    <p>Error: {error}</p>
                    <button onClick={fetchStreakData} className="btn btn-ghost mt-2">
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    const statusMessage = getStreakStatusMessage(streakData);
    const nextMilestone = getNextMilestone(streakData.currentStreak);

    return (
        <div className="bg-white border border-black rounded-lg p-6 shadow-xl">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <div className="w-3 h-3 bg-black rounded-full"></div>
                WORKOUT STREAKS
            </h2>

            <div className="mb-6">
                <div className="text-center bg-neutral-100 border border-gray-300 rounded-lg p-4">
                    <div className="text-4xl font-bold mb-2">
                        {streakData.currentStreak === 0 ? '0️⃣' : '🔥'} {streakData.currentStreak}
                    </div>
                    <div className="text-lg font-semibold text-gray-700">
                        Current Streak {streakData.currentStreak === 1 ? 'Day' : 'Days'}
                    </div>
                    <div className={`text-sm mt-2 font-medium ${statusMessage.color}`}>
                        {statusMessage.message}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="bg-neutral-300 border border-black rounded-lg p-4">
                    <div className="text-center">
                        <div className="text-2xl font-bold">🏆 {streakData.longestStreak}</div>
                        <div className="text-sm text-neutral-600">Longest Streak</div>
                    </div>
                </div>

                <div className="bg-neutral-300 border border-black rounded-lg p-4">
                    <div className="text-center">
                        <div className="text-2xl font-bold">🎯 {nextMilestone.daysLeft}</div>
                        <div className="text-sm text-neutral-600">
                            Days to {nextMilestone.milestone}-day milestone
                        </div>
                    </div>
                </div>
            </div>

            <div className={`text-center p-3 rounded-lg border ${streakData.isActiveToday
                ? 'bg-green-100 border-green-300 text-green-800'
                : 'bg-orange-100 border-orange-300 text-orange-800'
                }`}>
                {streakData.isActiveToday
                    ? '✅ Workout completed today!'
                    : '⏰ No workout logged today yet'
                }
            </div>

            {streakData.lastWorkoutDate && (
                <div className="text-center text-sm text-gray-600 mt-3">
                    Last workout: {new Date(streakData.lastWorkoutDate).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                    })}
                </div>
            )}
        </div>
    );
}

export default StreakStats;