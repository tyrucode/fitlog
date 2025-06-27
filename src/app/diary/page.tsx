'use client';
//context
import { useUser } from '@/context/UserContext';
//components
import CreateWorkoutForm from '@/components/CreateWorkoutForm';
import WorkoutList from '@/components/WorkoutList';
import { useState } from 'react';
import QuickStats from '@/components/QuickStats';

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
        <div className="min-h-screen bg-neutral-100 p-4 sm:p-8">
            <div className="max-w-7xl mx-auto mb-8">
                <div className="bg-white border border-black rounded-lg p-6 shadow-xl">
                    <div className="text-center">
                        <h1 className='text-4xl font-bold mb-2 tracking-tight'>FITLOG DASHBOARD</h1>
                        <div className="h-1 w-24 bg-black mx-auto mb-4"></div>
                        <p className='text-xl text-neutral-600'>
                            Welcome back, <span className="font-semibold text-black">{user.user_metadata.first_name}</span>
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                    {/* Create Workout Section */}
                    <div className="space-y-4">
                        <div className="bg-neutral-300 border border-black rounded-lg p-4 shadow-xl">
                            <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
                                <div className="w-3 h-3 bg-black rounded-full"></div>
                                CREATE WORKOUT
                            </h2>
                            <p className="text-neutral-700 mb-4">Log your fitness activity</p>
                        </div>
                        <CreateWorkoutForm onWorkoutCreated={handleWorkoutCreated} />
                    </div>

                    {/* Workout History Section */}
                    <div className="space-y-4">
                        <div className="bg-neutral-300 border border-black rounded-lg p-4 shadow-xl">
                            <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
                                <div className="w-3 h-3 bg-black rounded-full"></div>
                                WORKOUT HISTORY
                            </h2>
                            <p className="text-neutral-700 mb-4">Track your progress</p>
                        </div>
                        <WorkoutList refreshTrigger={refreshTrigger} />
                    </div>
                </div>
            </div>
            <QuickStats refreshTrigger={refreshTrigger} />
        </div>
    )
}