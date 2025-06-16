'use client';

function Page() {

    const signUp = () => {
        console.log('sign up!');
    };

    return (
        <div className="flex flex-col items-center justify-center p-8 gap-16 sm:p-20">
            <h1 className="text-2xl font-semibold text-center">Welcome to Sign Up Page</h1>
            <div className="border border-black rounded p-6 w-full max-w-md bg-white shadow-md">
                <form
                    className="flex flex-col gap-4"
                    onSubmit={(e) => {
                        e.preventDefault();
                        signUp();
                    }}
                >
                    <label htmlFor="fname">First Name:</label>
                    <input
                        type="text"
                        id="fname"
                        required
                        placeholder="First Name"
                        className="bg-neutral-300 border border-black rounded px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-black"
                    />

                    <label htmlFor="lname">Last Name:</label>
                    <input
                        type="text"
                        id="lname"
                        required
                        placeholder="Last Name"
                        className="bg-neutral-300 border border-black rounded px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-black"
                    />

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
                        Create Account
                    </button>
                    <a className="btn btn-ghost" href="/auth/signin">Already have an account? Sign In!</a>
                </form>
            </div>
        </div>
    );
}

export default Page;
