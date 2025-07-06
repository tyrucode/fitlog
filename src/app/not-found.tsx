"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/router";

function notfound() {
    // state for the not found page
    const [seconds, setSeconds] = useState(5);
    const router = useRouter();

    useEffect(() => {
        const timer = setInterval(() => {
            setSeconds((prevSeconds) => { // take the timer and  when it hits 1 nav the user to the home page
                if (prevSeconds === 1) {
                    clearInterval(timer); // stop the timer
                    router.push('/'); // send user home
                    return 0;
                }
                return prevSeconds - 1;
            });
        }, 1000);

        return () => clearInterval(timer); // cleanup
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

export default notfound