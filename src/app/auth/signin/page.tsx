'use client';
import supabase from "@/lib/supbase";
import { useState } from "react";

function page() {
    //type alias for the forms data
    type FormData = {
        email: string;
        password: string;
    };
    //using type alias to declare the types of values being inputted into our form
    const [formData, setFormData] = useState<FormData>({
        email: '',
        password: '',
    })

    const signIn = async () => {
        const { email, password } = formData
        console.log('sign in!');

        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        })

        if (error) {
            console.log('error signing in:', error)
        } else {
            console.log('user signed in!', data)
            window.location.href = "/diary";
        }
    };

    return (
        <div className="flex flex-col items-center justify-center p-8 gap-16 sm:p-20">
            <h1 className="text-2xl font-semibold text-center">Sign In!</h1>
            <div className="border border-black rounded p-6 w-full max-w-md bg-white shadow-md">
                <form
                    className="flex flex-col gap-4"
                    onSubmit={(e) => {
                        e.preventDefault();
                        signIn();
                    }}
                >

                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        required
                        placeholder="fakeEmail@email.com"
                        className="bg-neutral-300 border border-black rounded px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-black"
                    />

                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        required
                        placeholder="Password"
                        minLength={8}
                        pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                        title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
                        className="bg-neutral-300 border border-black rounded px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-black"
                    />
                    <button type="submit" className="btn btn-ghost">
                        Sign In!
                    </button>

                </form>
                <a className=" flex flex-col gap-4 btn btn-ghost" href="/auth/signup">Dont have an account? Sign Up!</a>
            </div>
        </div>
    )
}

export default page