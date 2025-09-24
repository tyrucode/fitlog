// src/lib/streakCalculations.ts - New file for streak logic
import { Workout } from './workoutOperations';

export type StreakData = {
    currentStreak: number;
    longestStreak: number;
    lastWorkoutDate: string | null;
    isActiveToday: boolean;
};

/**
 * Calculate workout streaks based on workout history
 * A streak is consecutive days with at least one workout
 */
export const calculateStreaks = (workouts: Workout[]): StreakData => {
    if (workouts.length === 0) {
        return {
            currentStreak: 0,
            longestStreak: 0,
            lastWorkoutDate: null,
            isActiveToday: false
        };
    }

    // Sort workouts by date (most recent first)
    const sortedWorkouts = [...workouts].sort((a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );

    // Get unique workout dates (just the date part, not time)
    const workoutDates = [...new Set(
        sortedWorkouts.map(workout =>
            new Date(workout.created_at).toDateString()
        )
    )].sort((a, b) => new Date(b).getTime() - new Date(a).getTime());

    const today = new Date().toDateString();
    const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toDateString();

    // Check if user worked out today
    const isActiveToday = workoutDates.includes(today);

    // Calculate current streak
    let currentStreak = 0;
    let checkDate = new Date();

    // Start checking from today or yesterday based on whether they worked out today
    if (!isActiveToday) {
        // If no workout today, check if they worked out yesterday to continue streak
        checkDate = new Date(Date.now() - 24 * 60 * 60 * 1000);
    }

    // Count consecutive days with workouts
    while (true) {
        const dateString = checkDate.toDateString();
        if (workoutDates.includes(dateString)) {
            currentStreak++;
            // Go back one day
            checkDate = new Date(checkDate.getTime() - 24 * 60 * 60 * 1000);
        } else {
            break;
        }
    }

    // Calculate longest streak
    let longestStreak = 0;
    let tempStreak = 0;
    let previousDate: Date | null = null;

    // Go through workout dates chronologically (reverse the array)
    const chronologicalDates = [...workoutDates].reverse();

    for (const dateString of chronologicalDates) {
        const currentDate = new Date(dateString);

        if (previousDate === null) {
            // First date
            tempStreak = 1;
        } else {
            // Check if current date is the day after previous date
            const dayDifference = (currentDate.getTime() - previousDate.getTime()) / (24 * 60 * 60 * 1000);

            if (dayDifference === 1) {
                // Consecutive day
                tempStreak++;
            } else {
                // Gap in streak, update longest if needed and reset
                longestStreak = Math.max(longestStreak, tempStreak);
                tempStreak = 1;
            }
        }

        previousDate = currentDate;
    }

    // Don't forget to check the last streak
    longestStreak = Math.max(longestStreak, tempStreak);

    return {
        currentStreak,
        longestStreak,
        lastWorkoutDate: workoutDates[0] || null,
        isActiveToday
    };
};

/**
 * Get streak status message for UI
 */
export const getStreakStatusMessage = (streakData: StreakData): { message: string; color: string } => {
    const { currentStreak, isActiveToday } = streakData;

    if (currentStreak === 0) {
        return {
            message: "Start your streak today!",
            color: "text-gray-600"
        };
    }

    if (isActiveToday) {
        return {
            message: `🔥 Active today! Keep it up!`,
            color: "text-green-600"
        };
    }

    if (currentStreak === 1) {
        return {
            message: "Workout today to continue your streak!",
            color: "text-orange-600"
        };
    }

    return {
        message: "Don't break the streak! Workout today!",
        color: "text-red-600"
    };
};

/**
 * Get days until streak milestone
 */
export const getNextMilestone = (currentStreak: number): { milestone: number; daysLeft: number } => {
    const milestones = [7, 14, 30, 50, 100, 200, 365];
    const nextMilestone = milestones.find(m => m > currentStreak) || milestones[milestones.length - 1] + 100;

    return {
        milestone: nextMilestone,
        daysLeft: nextMilestone - currentStreak
    };
};