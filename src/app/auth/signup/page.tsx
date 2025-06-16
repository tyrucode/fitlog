import React from 'react'

function page() {
    return (
        <div className="flex flex-col items-center justify-center p-8 gap-16 sm:p-20">
            <h1 className="text-2xl font-semibold text-center">Welcome to Sign Up Page</h1>

            <div className="border border-black rounded p-6 w-full max-w-md bg-white shadow-md">
                <div className="flex flex-col gap-4">
                    <input
                        type="text"
                        className="bg-neutral-300 border border-black rounded px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-black"
                        placeholder="fakeEmail@email.com"
                    />
                    <input
                        type="password"
                        className="bg-neutral-300 border border-black rounded px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-black"
                        placeholder="password123"
                    />
                    <button className="btn btn-ghost ">Create Account</button>
                    <button className="btn btn-ghost ">Already have an account? Sign In</button>
                </div>
            </div>
        </div>
    );

}

export default page