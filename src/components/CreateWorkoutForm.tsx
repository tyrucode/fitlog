"use client"
import React, { useState, useEffect } from "react"
import { createWorkout, type NewWorkout, getUserWorkouts } from "@/lib/workoutOperations"

type CreateWorkoutFormProps = {
    onWorkoutCreated?: () => void;
};

type ExerciseSuggestion = {
    name: string;
    count: number;
    avgDuration: number;
};

function CreateWorkoutForm({ onWorkoutCreated }: CreateWorkoutFormProps) {
    const [status, setStatus] = useState<{ type: 'error' | 'success'; message: string } | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [suggestions, setSuggestions] = useState<ExerciseSuggestion[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    const [formData, setFormData] = useState<NewWorkout>({
        exercise_name: '',
        duration_minutes: 0,
        created_at: new Date().toISOString()
    });

    // Load exercise suggestions on mount
    useEffect(() => {
        loadExerciseSuggestions();
    }, []);

    const loadExerciseSuggestions = async () => {
        try {
            const workouts = await getUserWorkouts();

            // Group exercises and calculate stats
            const exerciseMap = new Map<string, { count: number; totalDuration: number }>();

            workouts.forEach(workout => {
                const name = workout.exercise_name.toLowerCase();
                const existing = exerciseMap.get(name) || { count: 0, totalDuration: 0 };
                exerciseMap.set(name, {
                    count: existing.count + 1,
                    totalDuration: existing.totalDuration + Number(workout.duration_minutes)
                });
            });

            // Convert to array and sort by frequency
            const suggestionsList: ExerciseSuggestion[] = Array.from(exerciseMap.entries())
                .map(([name, stats]) => ({
                    name: name.charAt(0).toUpperCase() + name.slice(1),
                    count: stats.count,
                    avgDuration: Math.round(stats.totalDuration / stats.count)
                }))
                .sort((a, b) => b.count - a.count)
                .slice(0, 6); // Top 6 exercises

            setSuggestions(suggestionsList);
        } catch (e) {
            console.error("Error loading suggestions:", e);
        }
    };

    const handleSuggestionClick = (suggestion: ExerciseSuggestion) => {
        setFormData({
            exercise_name: suggestion.name,
            duration_minutes: suggestion.avgDuration
        });
        setShowSuggestions(false);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;

        if (id === 'duration_minutes') {
            const numValue = parseInt(value) || 0;
            setFormData((prev) => ({ ...prev, [id]: numValue }));
        } else {
            setFormData((prev) => ({ ...prev, [id]: value }));
            // Show suggestions when user starts typing
            if (id === 'exercise_name' && value.length > 0) {
                setShowSuggestions(true);
            }
        }
    }

    const handleSubmit = async () => {
        console.log('form submitted');

        if (!formData.exercise_name.trim()) {
            setStatus({ type: 'error', message: 'Exercise name is required' });
            return;
        }
        if (!isNaN(Number(formData.exercise_name.trim()))) {
            setStatus({ type: 'error', message: 'Exercise name cannot be a number' });
            return;
        }
        if (formData.duration_minutes <= 0) {
            setStatus({ type: 'error', message: 'Duration must be greater than 0' });
            return;
        }

        setIsSubmitting(true);
        setStatus(null);

        try {
            const workoutData = {
                ...formData,
                created_at: new Date().toISOString()
            };

            await createWorkout(workoutData);

            setFormData({
                exercise_name: '',
                duration_minutes: 0
            });

            // Reload suggestions after creating workout
            loadExerciseSuggestions();

            if (onWorkoutCreated) {
                onWorkoutCreated();
            }

        } catch (e) {
            console.error("error:", e);
            setStatus({ type: 'error', message: 'Failed to create workout, please try again.' });
        } finally {
            setIsSubmitting(false);
            setStatus({ type: 'success', message: 'Workout created successfully!' });
            setTimeout(() => setStatus(null), 3000);
        }
    }

    // Filter suggestions based on input
    const filteredSuggestions = suggestions.filter(s =>
        s.name.toLowerCase().includes(formData.exercise_name.toLowerCase())
    );

    return (
        <div className="border border-black rounded p-6 w-full bg-white shadow-md">
            <h2 className="text-xl font-semibold mb-4">Create a Workout</h2>
            <p className="mb-4">Start by creating your workout</p>

            {/* Quick Select Buttons */}
            {suggestions.length > 0 && !formData.exercise_name && (
                <div className="mb-4">
                    <p className="text-sm font-medium mb-2 text-neutral-600">Quick Select (Recent Exercises):</p>
                    <div className="flex flex-wrap gap-2">
                        {suggestions.slice(0, 4).map((suggestion, idx) => (
                            <button
                                key={idx}
                                type="button"
                                onClick={() => handleSuggestionClick(suggestion)}
                                className="px-3 py-2 bg-neutral-200 hover:bg-neutral-300 border border-black rounded text-sm font-medium transition-colors"
                            >
                                {suggestion.name}
                                <span className="ml-1 text-xs text-neutral-600">
                                    ({suggestion.avgDuration}m)
                                </span>
                            </button>
                        ))}
                    </div>
                </div>
            )}

            <form
                className="flex flex-col gap-4"
                onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit();
                }}
            >
                <label htmlFor="exercise_name">Exercise Name:</label>
                <div className="relative">
                    <input
                        id="exercise_name"
                        type="text"
                        value={formData.exercise_name}
                        onChange={handleChange}
                        onFocus={() => formData.exercise_name && setShowSuggestions(true)}
                        onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                        required
                        placeholder="Pushups, Squats, Curls..."
                        className="w-full bg-neutral-300 border border-black rounded px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-black"
                    />

                    {/* Dropdown suggestions */}
                    {showSuggestions && filteredSuggestions.length > 0 && formData.exercise_name && (
                        <div className="absolute z-10 w-full mt-1 bg-white border border-black rounded shadow-lg max-h-48 overflow-y-auto">
                            {filteredSuggestions.map((suggestion, idx) => (
                                <button
                                    key={idx}
                                    type="button"
                                    onClick={() => handleSuggestionClick(suggestion)}
                                    className="w-full text-left px-4 py-2 hover:bg-neutral-200 border-b border-neutral-300 last:border-b-0"
                                >
                                    <div className="flex justify-between items-center">
                                        <span className="font-medium">{suggestion.name}</span>
                                        <span className="text-sm text-neutral-600">
                                            {suggestion.count}x • avg {suggestion.avgDuration}m
                                        </span>
                                    </div>
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                <label htmlFor="duration_minutes">Duration (minutes):</label>
                <input
                    id="duration_minutes"
                    type="number"
                    value={formData.duration_minutes || ''}
                    onChange={handleChange}
                    required
                    placeholder="30"
                    className="bg-neutral-300 border border-black rounded px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-black"
                />

                {status && (
                    <div className={`${status.type === 'error' ? 'text-red-600' : 'text-green-600'} text-sm font-medium`}>
                        {status.message}
                    </div>
                )}

                <button
                    type="submit"
                    className="btn btn-ghost disabled:opacity-50"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Creating...' : 'Create Workout'}
                </button>
            </form>
        </div>
    )
}

export default CreateWorkoutForm