"use client"
import React, { useState } from "react"
import { createWorkout, type NewWorkout } from "@/lib/workoutOperations"


function CreateWorkoutForm() {

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log('form submitted');

    }


    return (
        <>
            <h2 className="text-xl font-semibold mb-4">Create a Workout</h2>
            <div className="border border-black rounded p-6 w-full max-w-md bg-white shadow-md">
                <div className="flex flex-col gap-4">
                    <p>Start by creating your workout</p>
                    <form onSubmit={handleSubmit}></form>
                </div>
            </div>
        </>
    )
}

export default CreateWorkoutForm