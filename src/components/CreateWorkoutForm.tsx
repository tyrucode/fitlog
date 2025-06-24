"use client"
import React, { useState } from "react"
import { createWorkout, type NewWorkout } from "@/lib/workoutOperations"


function CreateWorkoutForm() {
    //creating states for errors
    const [status, setStatus] = useState<{ type: 'error' | 'success'; message: string } | null>(null);

    //callback to refresh workout list
    type CreateWorkoutFormProps = {
        onWorkoutCreated?: () => void;
    };

    //creating the form which uses types from our workout operations db file
    const [formData, setFormData] = useState<NewWorkout>({
        exercise_name: '',
        duration_minutes: 0
    }); //submission state for UI 
    const [isSubmitting, setIsSubmitting] = useState(false);

    //submitting workout once created
    const handleSubmit = async () => {
        console.log('form submitted');
    }

    return (
        <>
            <h2 className="text-xl font-semibold mb-4">Create a Workout</h2>
            <div className="border border-black rounded p-6 w-full max-w-md bg-white shadow-md">

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
                        required
                        placeholder="Last Name"
                        className="bg-neutral-300 border border-black rounded px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-black"
                    />
                </form>

            </div>
        </>
    )
}

export default CreateWorkoutForm