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

    if (isLoading) return <p className='flex flex-col items-center justify-center p-8 gap-16 sm:p-20'>Loading...</p>;
    if (!user) return <p className='flex flex-col items-center justify-center p-8 gap-16 sm:p-20'>You must be logged in.</p>;

    return (
        <div className="flex flex-col items-center justify-center p-8 gap-6 sm:p-20">
            <div className='text-center'>
                <h1 className='text-3xl font-bold mb-2'>FITLOG DASHBOARD</h1>
                <p className='text-lg'>Welcome back, {user.user_metadata.first_name}</p>
            </div >
            <CreateWorkoutForm onWorkoutCreated={handleWorkoutCreated} />
            <WorkoutList refreshTrigger={refreshTrigger} />
        </div>
    )
}