'use client';
//regular imports
import supabase from "@/lib/supabase";
import { useState } from "react";


function Page() {
    //type alias for the forms data
    type FormData = {
        email: string;
        password: string;
        first_name: string;
        last_name: string;
    };
    //using type alias to declare the types of values being inputted into our form
    const [formData, setFormData] = useState<FormData>({
        email: '',
        password: '',
        first_name: '',
        last_name: '',
    })

    //creating states for errors
    const [status, setStatus] = useState<{ type: 'error' | 'success'; message: string } | null>(null);

    //function for users to signup
    const signUp = async () => {
        const { email, password, first_name, last_name } = formData
        const { data, error } = await supabase.auth.signUp(
            {
                email,
                password,
                options: {
                    data: {
                        first_name,
                        last_name
                    }
                }
            }
        )
        //normally would do a try catch but since supabases function just offers this we will use that 
        if (error) {
            console.log('error signing up:', error)
            setStatus({ type: 'error', message: error.message })
        } else {
            console.log('user signed up!', data)
            setStatus({ type: 'success', message: 'Successfully signed up!' })
            setTimeout(() => {
                window.location.href = "/auth/signin";
            }, 1000);;
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }))
    }


    return (
        <div className="flex flex-col items-center justify-center p-8 gap-6 sm:p-20">
            <h1 className="text-3xl font-semibold text-center">Register your account</h1>
            <h2>so that you can use all the features FitLog has to offer!</h2>
            <div className="border border-black rounded p-6 w-full max-w-md bg-white shadow-md">
                <form
                    className="flex flex-col gap-4"
                    onSubmit={(e) => {
                        e.preventDefault();
                        signUp();
                    }}
                >
                    <label htmlFor="first_name">First Name:</label>
                    <input
                        onChange={handleChange}
                        value={formData.first_name}
                        type="text"
                        id="first_name"
                        required
                        placeholder="First Name"
                        className="bg-neutral-300 border border-black rounded px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-black"
                    />

                    <label htmlFor="last_name">Last Name:</label>
                    <input
                        onChange={handleChange}
                        value={formData.last_name}
                        type="text"
                        id="last_name"
                        required
                        placeholder="Last Name"
                        className="bg-neutral-300 border border-black rounded px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-black"
                    />

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
                        <div className={`${status.type === 'error' ? 'text-red-600' : 'text-green-600'} text-sm font-medium`}>
                            {status.message}
                        </div>
                    )}
                    <button type="submit" className="btn btn-ghost">
                        Create Account
                    </button>
                </form>
                <a className="btn btn-ghost flex flex-col gap-4" href="/auth/signin">Already have an account? Sign In!</a>
            </div>
        </div>
    );
}

export default Page;
