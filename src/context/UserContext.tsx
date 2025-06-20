"use client"

import { useEffect, createContext, useContext, useState, Children } from "react"
import { Session, User } from "@supabase/supabase-js"
import supabase from "@/lib/supbase"

//type alias for our UserContext for typescript type checking
type UserContextType = {
    user: User | null;
    session: Session | null;
    isLoading: boolean;
}
//creating context 
const UserContext = createContext<UserContextType>({
    user: null,
    session: null,
    isLoading: true
})

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [session, setSession] = useState<Session | null>(null);
    const [isLoading, setIsLoading] = useState(true);


    //use session for api calls needing authentication, use user for most frontend calls
    //like this -- const token = session?.access_token

    //initial load to check for log
    useEffect(() => {
        //creating/updating our own state for easier use
        const getInitialSession = async () => {
            const { data } = await supabase.auth.getSession();
            setUser(data.session?.user ?? null);
            setSession(data.session);
            setIsLoading(false);
        }
        getInitialSession();
        //using supabase auth function
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            (event, session) => {
                if (event === 'SIGNED_OUT') {
                    setSession(null)
                    setUser(null)
                } else if (session) {
                    setSession(session)
                    setUser(session.user)
                }
            })
        return () => {
            subscription.unsubscribe()
        }
        //on mount
    }, []);
    return (
        <UserContext.Provider value={{ user, session, isLoading }}>
            {children}
        </UserContext.Provider>
    )
}

// creating custom hook
export const useUser = () => useContext(UserContext);