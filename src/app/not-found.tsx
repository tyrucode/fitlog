// app/not-found.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NotFound() {
    const [seconds, setSeconds] = useState(5);
    const router = useRouter();

    useEffect(() => {
        const timer = setInterval(() => {
            setSeconds((prevSeconds) => {
                if (prevSeconds === 1) {
                    clearInterval(timer);
                    router.push('/');
                    return 0;
                }
                return prevSeconds - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [router]);

    return (
        <div className=" items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20)]">
            <div className='flex flex-col items-center min-h-screen p-8 gap-16 sm:p-20'>
                <div className="bg-white border flex flex-col border-black rounded-lg p-8 shadow-xl">
                    <h2 className="text-2xl font-bold mb-4">PAGE NOT FOUND</h2>
                    <div className="animate-pulse text-xl mb-4 font-semibold text-red-600">Returning home in {seconds} seconds</div>
                </div>
            </div>
        </div>
    )
}
