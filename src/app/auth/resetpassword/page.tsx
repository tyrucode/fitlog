'use client';
import { useState } from "react";
import supabase from "@/lib/supbase";

function page() {
    //type alias for the forms data
    type FormData = {
        new_password: string;
        confirm_password: string;
    };

    //using type alias to declare the types of values being inputted into our form
    const [formData, setFormData] = useState<FormData>({
        new_password: '',
        confirm_password: ''
    })

    //creating states for errors
    const [status, setStatus] = useState<{ type: 'error' | 'success'; message: string } | null>(null);


    const resetPassword = async () => {
        if (formData.new_password !== formData.confirm_password) {
            setStatus({ type: 'error', message: "Passwords do not match" });
            return;
        }

        console.log('attempting password reset!')

        const { data, error } = await supabase.auth.updateUser({
            password: formData.new_password,
        });

        if (error) {
            setStatus({ type: 'error', message: error.message });
        } else {
            setStatus({ type: 'success', message: 'Password successfully reset!' });
            setTimeout(() => {
                window.location.href = "/auth/signin";
            }, 1000);
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }))
    }

    return (
        <div className="flex flex-col items-center justify-center p-8 gap-6 sm:p-20">
            <h1 className="text-2xl font-semibold text-center">Reset your password!</h1>
            <h2>Create a new password that hasnt been used before to continue using Fitlog securely</h2>

            <div className="border border-black rounded p-6 w-full max-w-md bg-white shadow-md">
                <form
                    className="flex flex-col gap-4"
                    onSubmit={(e) => {
                        e.preventDefault();
                        resetPassword();
                    }}
                >
                    <label htmlFor="new_password">New Password:</label>
                    <input
                        onChange={handleChange}
                        value={formData.new_password}
                        type="password"
                        id="new_password"
                        required
                        placeholder="Enter your new password"
                        minLength={6}
                        pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                        title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
                        className="bg-neutral-300 border border-black rounded px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-black"
                    />
                    <label htmlFor="confirm_password">Confirm Password:</label>
                    <input
                        onChange={handleChange}
                        value={formData.confirm_password}
                        type="password"
                        id="confirm_password"
                        required
                        placeholder="Enter your new password, again"
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
                        Reset!
                    </button>
                </form>
                <div className="flex flex-col">
                    <a className="btn btn-ghost" href="/auth/signin">
                        Cancel and Sign in
                    </a>
                </div>
            </div>
        </div>
    )
}

export default page