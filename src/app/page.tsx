
export default function Home() {
  return (
    <div className=" items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20)]">
      <div className="min-h-screen bg-neutral-100 p-4 sm:p-8">
        <div className="max-w-7xl mx-auto mb-8">
          <div className="bg-white border border-black rounded-lg p-6 shadow-xl">
            <div className="text-center">
              <h1 className='text-4xl font-bold mb-2 tracking-tight'>Welcome to FitLog!</h1>
              <div className="h-1 w-24 bg-black mx-auto mb-4"></div>
              <p className='text-xl text-neutral-600'>
                <p>To use this app sign up, or create an account!</p>
                <p>Fitlog is an app that allows users to log the workouts they do and see their progress over time.</p>
                <p>You can also visit your friends pages and see how their workouts are going as well!</p>
              </p>
            </div>
          </div>
        </div>
      </div >
    </div >
  );
}
