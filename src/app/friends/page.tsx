import React from 'react'

function page() {
    return (
        <div className=" items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20)]">
            <div className="min-h-screen bg-neutral-100 p-4 sm:p-8">
                <div className="max-w-7xl mx-auto mb-8">
                    <div className="bg-white border border-black rounded-lg p-6 shadow-xl">
                        <div className="text-center">
                            <h1 className='text-4xl font-bold mb-2 tracking-tight'>FitLog Friends!</h1>
                            <div className="h-1 w-24 bg-black mx-auto mb-4"></div>
                            <p className='text-xl text-neutral-600'>
                                <p>View your friends profiles here</p>
                            </p>
                            <div>
                                <p className='text-xl text-neutral-600'>
                                    <p>To add friends, go to your dashboard and click the "Add Friend" button.</p>
                                    <p>You can see your friends' workouts and progress here!</p>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </div >
    )
}

export default page