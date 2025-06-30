import { FaLinkedin } from "react-icons/fa6";
import { MdWork, MdFitnessCenter } from "react-icons/md";

function Footer() {
    return (
        <footer className="footer sm:footer-horizontal border-neutral-500 items-center p-4 ">
            <aside className="grid-flow-col items-center ">
                <MdFitnessCenter className="w-10 h-10" />
                <p>If you enjoy, feel free to check out my <a className="underline" href="https://tylerruiz.dev/" target="_blank">Portfolio</a> or <a className="underline" href="https://www.linkedin.com/in/tyler-ruiz-84a287305/" target="_blank">LinkedIn</a> for more!</p>
            </aside>
            <nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
                <a target="_blank" href="https://tylerrruiz.dev/">
                    <MdWork className="w-10 h-10" />
                </a>
                <a target="_blank" href="https://www.linkedin.com/in/tyler-ruiz-84a287305/">
                    <FaLinkedin className="w-10 h-10" />
                </a>
            </nav>
        </footer>
    )
}

export default Footer