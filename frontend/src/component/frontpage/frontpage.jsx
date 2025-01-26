import React from "react";
import { Boxes } from "../ui/Bg-boxex";
import Logo from "../../assets/Logo.png"
import { Link } from "react-router-dom";
function Frontpage() {
    return (
        (<div
            className="h-screen relative w-full overflow-hidden bg-black flex flex-col items-center justify-center">
            <div
                className="absolute inset-0 w-full h-full bg-slate-900 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
            <Boxes />

            <img src={Logo} alt="" className="h-60 w-60" />
            <div className="h-28 flex justify-center items-center gap-8 mt-10">
            <h1 className="animate-text bg-gradient-to-r from-orange-700 via-[#422730] to-orange-500 bg-clip-text text-transparent text-5xl font-black">
                Welcome to
            </h1>
            <span className="text-[70px] animate-text bg-gradient-to-r from-red-400 via-[#422730] to-orange-500 bg-clip-text text-transparent font-black">
                Momentra
            </span>
            </div>

            <div className="flex gap-10 z-20 mt-10">
            <Link to="/signup"><button className="h-16 w-40 bg-[#002D74] text-white text-2xl font-bold py-3 rounded-xl hover:scale-110 hover:text-black duration-300 hover:bg-[#2f6aa0]">Sign Up</button></Link>
            <Link to="/login"><button className="h-16 w-40 bg-[#2e77ed] text-white text-2xl font-bold py-3 rounded-xl hover:scale-110 hover:text-black duration-300 hover:bg-[#2f6aa0]">Login</button></Link>
            </div>

        </div>)
    );
}

export default Frontpage;