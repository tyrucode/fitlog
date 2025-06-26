'use client';
//context
import { useUser } from '@/context/UserContext';
//components
import CreateWorkoutForm from '@/components/CreateWorkoutForm';
import WorkoutList from '@/components/WorkoutList';
import { useState } from 'react';

export default function Page() {
    const { user, isLoading } = useUser();
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    //function to trigger a refresh of the list of workouts we have
    const handleWorkoutCreated = () => {
        setRefreshTrigger(prev => prev + 1)
    }

    if (isLoading) return (
        <div className='flex flex-col items-center  min-h-screen p-8 gap-16 sm:p-20'>
            <div className="bg-white border border-black rounded-lg p-8 shadow-xl">
                <div className="animate-pulse text-xl font-semibold">Loading your dashboard...</div>
            </div>
        </div>
    );

    if (!user) return (
        <div className='flex flex-col items-center min-h-screen p-8 gap-16 sm:p-20'>
            <div className="bg-white border flex flex-col border-black rounded-lg p-8 shadow-xl">
                <h2 className="text-2xl font-bold mb-4">Access Denied</h2>
                <div className="animate-pulse text-xl mb-4 font-semibold text-red-600">You must be logged in to access your dashboard.</div>
                <a href="/auth/signin" className="btn btn-ghost">Sign In</a>
            </div>
        </div>
    );

    return (
        <div className="flex flex-col items-center justify-center p-8 gap-6 sm:p-20">
            <div className='text-center'>
                <h1 className='text-3xl font-bold mb-2'>FITLOG DASHBOARD</h1>
                <p className='text-lg'>Welcome back, {user.user_metadata.first_name}</p>
            </div >
            <div className='flex flex-row gap-6'>
                <CreateWorkoutForm onWorkoutCreated={handleWorkoutCreated} />
                <WorkoutList refreshTrigger={refreshTrigger} />
            </div>
        </div>
    )
}