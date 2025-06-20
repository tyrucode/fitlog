'use client';
import { useState } from "react";
import supabase from "@/lib/supbase";

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

    const resetPassword = async () => {
        console.log('password reset!')
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }))
    }

    return (
        <div className="flex flex-col items-center justify-center p-8 gap-6 sm:p-20">
            <h1 className="text-2xl font-semibold text-center">Reset your password!</h1>
            <div className="border border-black rounded p-6 w-full max-w-md bg-white shadow-md">
                <form
                    className="flex flex-col gap-4"
                    onSubmit={(e) => {
                        e.preventDefault();
                        resetPassword();
                    }}
                >
                    <label htmlFor="text">Old Password:</label>

                </form>
            </div>
        </div>
    )
}

export default page