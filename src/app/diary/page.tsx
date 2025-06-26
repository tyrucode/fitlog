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
        <div className='flex flex-col items-center justify-center min-h-screen'>
            <div className="loading loading-spinner loading-lg"></div>
            <p className='mt-4 text-lg'>Loading your fitness journey...</p>
        </div>
    );

    if (!user) return (
        <div className='flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100'>
            <div className="card w-96 bg-white shadow-xl">
                <div className="card-body text-center">
                    <h2 className="card-title justify-center text-2xl">Access Required</h2>
                    <p>Please sign in to access your fitness dashboard</p>
                    <div className="card-actions justify-center">
                        <a href="/auth/signin" className="btn btn-primary">Sign In</a>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
                <div className="container mx-auto px-6 py-12">
                    <div className="text-center">
                        <h1 className='text-4xl md:text-5xl font-bold mb-4 animate-fade-in'>
                            Welcome back, {user.user_metadata.first_name}! 🏋️‍♂️
                        </h1>
                        <p className='text-xl opacity-90 max-w-2xl mx-auto'>
                            Ready to crush your fitness goals today? Track your progress and stay motivated.
                        </p>
                    </div>
                </div>
            </div>

            {/* Stats Section */}
            <div className="container mx-auto px-6 -mt-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <div className="stats shadow-lg bg-white">
                        <div className="stat">
                            <div className="stat-figure text-primary">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                            </div>
                            <div className="stat-title">Total Workouts</div>
                            <div className="stat-value text-primary">View List</div>
                            <div className="stat-desc">This month</div>
                        </div>
                    </div>

                    <div className="stats shadow-lg bg-white">
                        <div className="stat">
                            <div className="stat-figure text-secondary">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4"></path>
                                </svg>
                            </div>
                            <div className="stat-title">Streak</div>
                            <div className="stat-value text-secondary">Start Today!</div>
                            <div className="stat-desc">Keep it going</div>
                        </div>
                    </div>

                    <div className="stats shadow-lg bg-white">
                        <div className="stat">
                            <div className="stat-figure text-accent">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path>
                                </svg>
                            </div>
                            <div className="stat-title">Motivation</div>
                            <div className="stat-value text-accent">High!</div>
                            <div className="stat-desc">Let's workout</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-6 pb-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Create Workout Card */}
                    <div className="order-2 lg:order-1">
                        <div className="card bg-white shadow-xl border-0 hover:shadow-2xl transition-all duration-300">
                            <div className="card-body">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                        </svg>
                                    </div>
                                    <h2 className="card-title text-2xl">Quick Add Workout</h2>
                                </div>
                                <CreateWorkoutForm onWorkoutCreated={handleWorkoutCreated} />
                            </div>
                        </div>
                    </div>

                    {/* Workout List Card */}
                    <div className="order-1 lg:order-2">
                        <div className="card bg-white shadow-xl border-0 hover:shadow-2xl transition-all duration-300">
                            <div className="card-body">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                        </svg>
                                    </div>
                                    <h2 className="card-title text-2xl">Your Progress</h2>
                                </div>
                                <WorkoutList refreshTrigger={refreshTrigger} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Motivational Section */}
                <div className="mt-12">
                    <div className="card bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-xl">
                        <div className="card-body text-center">
                            <h2 className="card-title justify-center text-3xl mb-4">💪 Stay Strong!</h2>
                            <p className="text-lg opacity-90 max-w-2xl mx-auto">
                                "The only bad workout is the one that didn't happen. Every rep counts, every minute matters.
                                You're building the strongest version of yourself!"
                            </p>
                            <div className="card-actions justify-center mt-6">
                                <button className="btn btn-ghost btn-outline border-white text-white hover:bg-white hover:text-purple-500">
                                    View All Workouts
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}