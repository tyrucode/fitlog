'use client';
//context
import { useUser } from '@/context/UserContext';

export default function Page() {
    const { user, isLoading } = useUser();
    if (isLoading) return <p className='flex flex-col items-center justify-center p-8 gap-16 sm:p-20'>Loading...</p>;
    if (!user) return <p className='flex flex-col items-center justify-center p-8 gap-16 sm:p-20'>You must be logged in.</p>;
    return (
        <div className=" items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20)]">
            <h1>YOUR STATS</h1>
            <p>Welcome, {user.email}!</p>;
        </div>
    )
}