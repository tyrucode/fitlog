"use client"
import React, { useState } from "react"
import { createWorkout, type NewWorkout } from "@/lib/workoutOperations"

//callback to refresh workout list
type CreateWorkoutFormProps = {
    onWorkoutCreated?: () => void;
};

function CreateWorkoutForm({ onWorkoutCreated }: CreateWorkoutFormProps) {
    //creating states for errors
    const [status, setStatus] = useState<{ type: 'error' | 'success'; message: string } | null>(null);
    //submission state for UI 
    const [isSubmitting, setIsSubmitting] = useState(false);

    //creating the form which uses types from our workout operations db file
    const [formData, setFormData] = useState<NewWorkout>({
        exercise_name: '',
        duration_minutes: 0,
        created_at: new Date().toISOString()
    });

    //form change handler
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        //making sure our duration is a number no matter what
        if (id === 'duration_minutes') {
            const numValue = parseInt(value) || 0;
            setFormData((prev) => ({ ...prev, [id]: numValue }));
        } else {
            setFormData((prev) => ({ ...prev, [id]: value }));
        }
    }
    //submitting workout once created
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
            //using new workout data obj so we can collect the data as a string as soon as its submitted
            const workoutData = {
                ...formData,
                created_at: new Date().toISOString()
            };
            //using db createworkout function with our form data we collected
            await createWorkout(workoutData);
            //resetting form data
            setFormData({
                exercise_name: '',
                duration_minutes: 0
            })
            //using the callback to refresh the workout list
            if (onWorkoutCreated) {
                onWorkoutCreated();
            }

        } catch (e) {
            console.error("error:", e);
            setStatus({ type: 'error', message: 'Failed to create workout, please try again.' });
        } finally {
            setIsSubmitting(false);
            setStatus({ type: 'success', message: 'Workout created successfully!', });
            //clearing success message after 3 seconds
            setTimeout(() => setStatus(null), 3000);
        }

    }

    return (
        <>
            <div className="border border-black rounded p-6 w-full bg-white shadow-md">
                <h2 className="text-xl font-semibold mb-4">Create a Workout</h2>
                <p>Start by creating your workout</p>
                <form
                    className="flex flex-col gap-4"
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleSubmit();
                    }}>
                    <label htmlFor="exercise_name">Exercise Name:</label>
                    <input
                        id="exercise_name"
                        type="text"
                        value={formData.exercise_name}
                        onChange={handleChange}
                        required
                        placeholder="Pushups, Squats, Curls..."
                        className="bg-neutral-300 border border-black rounded px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-black"
                    />
                    <label htmlFor="duration_minutes">Duration (minutes):</label>
                    <input
                        id="duration_minutes"
                        type="number"
                        value={formData.duration_minutes}
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
                    <button type="submit" className="btn btn-ghost disabled:opacity-50" disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Creating...' : 'Create Workout'}
                    </button>
                </form>

            </div>
        </>
    )
}

export default CreateWorkoutForm