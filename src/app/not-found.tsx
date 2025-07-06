"use client"

import { useState } from "react"

function notfound() {
    return (
        <div className=" items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20)]">

            <div className='flex flex-col items-center min-h-screen p-8 gap-16 sm:p-20'>
                <div className="bg-white border flex flex-col border-black rounded-lg p-8 shadow-xl">
                    <h2 className="text-2xl font-bold mb-4">PAGE NOT FOUND</h2>
                    <div className="animate-pulse text-xl mb-4 font-semibold text-red-600">Returning home in { } seconds</div>
                </div>
            </div>
            );
        </div>
    )
}

export default notfound