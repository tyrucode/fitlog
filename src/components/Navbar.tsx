'use client';
//context
import supabase from '@/lib/supabase';
import { useUser } from '@/context/UserContext';
import { MdFitnessCenter } from "react-icons/md";
import { FaHome } from "react-icons/fa";
import { FaUserFriends } from "react-icons/fa";




function Navbar() {
    const { user } = useUser();

    const signOut = async () => {
        await supabase.auth.signOut();
        window.location.href = '/';
    };

    return (
        <div className="navbar bg-white shadow-xl">
            <div className="flex-1">
                <a className="btn btn-ghost text-4xl font-bold mb-2 tracking-tight" href="/">FitLog <MdFitnessCenter /></a>
            </div>
            <div className="flex gap-2 ">
                <ul className="menu menu-horizontal px-1 text-xl">
                    <li><a href="/diary" className="btn btn-ghost text-xl">Dashboard <FaHome /></a></li>
                    {!user && (
                        <li><a className="btn btn-ghost text-xl" href="/auth/signup">Join</a></li>
                    )}
                    {user && (
                        <>
                            <li><a className="btn btn-ghost text-xl" href="/friends">Friends <FaUserFriends /></a></li>
                            <li><button onClick={signOut} className="btn btn-ghost text-xl">Sign Out</button></li>
                        </>
                    )}
                </ul>

            </div>
        </div>
    )
}

export default Navbar