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

    //creating states for errors
    const [status, setStatus] = useState<string>('');

    const signIn = async () => {
        const { email, password } = formData
        console.log('sign in!');
        setStatus('');

        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        })

        if (error) {
            console.log('error signing in:', error)
            setStatus(error.message)

        } else {
            console.log('user signed in!', data)
            window.location.href = "/diary";
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }))
    }

    const reqPasswordEmail = async () => {
        const { email } = formData;
        setStatus('');

        const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: 'https://example.com/update-password',
        })

        if (error) {
            console.log('error requesting password reset:', error);
            setStatus(error.message);
        } else {
            console.log('password reset email sent!', data);
            setStatus('Password reset email sent! Please check your inbox.');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center p-8 gap-6 sm:p-20">
            <h1 className="text-3xl font-semibold text-center">Sign In!</h1>
            <h2>and use your account to explore FitLog</h2>
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
                        onChange={handleChange}
                        value={formData.email}
                        type="email"
                        id="email"
                        required
                        placeholder="fakeEmail@email.com"
                        className="bg-neutral-300 border border-black rounded px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-black"
                    />

                    <label htmlFor="password">Password:</label>
                    <input
                        onChange={handleChange}
                        value={formData.password}
                        type="password"
                        id="password"
                        required
                        placeholder="Password"
                        minLength={6}
                        pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                        title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
                        className="bg-neutral-300 border border-black rounded px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-black"
                    />
                    {status && (
                        <div className="text-red-600 text-sm font-medium">
                            Error: {status}, please try again.
                        </div>
                    )}
                    <button type="submit" className="btn btn-ghost">
                        Sign In!
                    </button>
                </form>
                <a className=" flex flex-col gap-4 btn btn-ghost" href="/auth/signup">Dont have an account? Sign Up here!</a>
                <button className=" flex flex-col gap-4 btn btn-ghost" onClick={() => reqPasswordEmail()}>Forgot your password? Reset here!</button>

            </div>
        </div>
    )
}

export default page