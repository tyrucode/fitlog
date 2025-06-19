'use client';
//context
import { useUser } from '@/context/UserContext';
import { useState } from 'react';

function Navbar() {
    const { user } = useUser();
    const dashText = !user ? "Dashboard" : "Start Logging!";
    return (
        <div className="navbar bg-white shadow-xl">
            <div className="flex-1">
                <a className="btn btn-ghost text-2xl" href="/">FitLog</a>
            </div>
            <div className="flex gap-2 ">
                <ul className="menu menu-horizontal px-1 text-xl">
                    <li><a href="/diary" className="btn btn-ghost ">{dashText}</a></li>
                    <li><a className="btn btn-ghost">Friends</a></li>
                    <li><a className="btn btn-ghost" href="/auth/signup">Join</a></li>
                </ul>

            </div>
        </div>
    )
}

export default Navbar