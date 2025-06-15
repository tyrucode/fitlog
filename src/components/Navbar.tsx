

function Navbar() {
    return (
        <div className="navbar bg-white shadow-xl">
            <div className="flex-1">
                <a className="btn btn-ghost text-2xl">FitLog</a>
            </div>
            <div className="flex gap-2 ">
                <ul className="menu menu-horizontal px-1 text-xl">
                    <li><a className="btn btn-ghost ">Start Logging!</a></li>
                    <li><a className="btn btn-ghost">Friends</a></li>
                    <li><a className="btn btn-ghost">Join</a></li>
                </ul>

            </div>
        </div>
    )
}

export default Navbar