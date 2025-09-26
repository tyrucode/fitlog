'use client'

import { useState, useEffect } from "react"
import { getUserWorkouts } from "@/lib/workoutOperations"
import { calculateStreaks } from "@/lib/streakCalculation"

type StreakBadgeProps = {
    refreshTrigger?: number;
    className?: string;
    showLabel?: boolean;
};

function StreakBadge({ refreshTrigger, className = "", showLabel = true }: StreakBadgeProps) {
    const [currentStreak, setCurrentStreak] = useState(0);
    const [isActiveToday, setIsActiveToday] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const fetchStreak = async () => {
        try {
            const workouts = await getUserWorkouts();
            const streakData = calculateStreaks(workouts);
            setCurrentStreak(streakData.currentStreak);
            setIsActiveToday(streakData.isActiveToday);
        } catch (e) {
            console.log('Error fetching streak:', e);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchStreak();
    }, [refreshTrigger]);

    if (isLoading) {
        return (
            <div className={`inline-flex items-center gap-2 ${className}`}>
                <div className="w-8 h-6 bg-gray-300 rounded animate-pulse"></div>
                {showLabel && <div className="w-12 h-4 bg-gray-200 rounded animate-pulse"></div>}
            </div>
        );
    }

    const getBadgeStyle = () => {
        if (currentStreak === 0) {
            return "bg-gray-100 text-gray-600 border-gray-300";
        }
        if (isActiveToday) {
            return "bg-green-100 text-green-700 border-green-300";
        }
        return "bg-orange-100 text-orange-700 border-orange-300";
    };

    const getEmoji = () => {
        if (currentStreak === 0) return "💤";
        if (currentStreak >= 30) return "🏆";
        if (currentStreak >= 7) return "🔥";
        return "⭐";
    };

    return (
        <div className={`inline-flex items-center gap-2 ${className}`}>
            <div className={`
                px-3 py-1 rounded-full border text-sm font-semibold
                ${getBadgeStyle()}
            `}>
                <span className="mr-1">{getEmoji()}</span>
                {currentStreak}
                {showLabel && (
                    <span className="ml-1 text-xs">
                        {currentStreak === 1 ? 'day' : 'days'}
                    </span>
                )}
            </div>
        </div>
    );
}

export default StreakBadge;