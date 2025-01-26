import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { CiSearch } from "react-icons/ci";
import { MdOutlineExplore } from "react-icons/md";
import { LuSquarePlus } from "react-icons/lu";

function RightSide() {

    const [userData, setUserData] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await axios.get('http://localhost:5000/api/user/user-data', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUserData(res.data);
            } catch (err) {
                setError(err.response?.data?.error || 'Error fetching user data');
            }
        };

        fetchUserData();
    }, []);

    if (error) {
        return <p style={{ color: 'red' }}>{error}</p>;
    }

    if (!userData) {
        return <div className='relative w-[25%] h-screen p-8 bg-black'>
            <Link to='/home'>
                <h2 className="animate-text text-5xl font-bold bg-gradient-to-r from-red-300 via-[#422730] to-orange-500 bg-clip-text text-transparent">
                    Momentra
                </h2>
            </Link>
        </div>;
    }

    return (
        <div className="relative w-[20%] h-screen p-8">
            <Link to='/home'>
                <h2 className="animate-text text-5xl font-bold bg-gradient-to-r from-red-300 via-[#422730] to-orange-500 bg-clip-text text-transparent">
                    Momentra
                </h2>
            </Link>
            <Link to="/profile">

                <div className="flex mt-5">
                    <img src={`http://localhost:5000/${userData.profileImage}`} alt="Profile" className='h-20 w-20 rounded-full' />
                    <div className="flex flex-wrap w-56 mt-3 flex-col px-2 ">
                        <span className="font-medium text-xl">{userData.name}</span>
                        <h2 className="font-medium text-base text-slate-500">{userData.username}</h2>
                    </div>
                </div>
            </Link>
            <ul className="flex flex-col gap-2.5 mt-5">
                <Link to="/home">
                    <div className="flex gap-5 p-3 hover:bg-neutral-600 hover:rounded-2xl cursor-pointer">
                        <AiFillHome className="h-7 w-7 fill-white" />
                        <li className="text-center text-xl font-normal">Home</li>
                    </div>
                </Link>

                <Link to="/search">
                    <div className="flex gap-5 p-3 hover:bg-neutral-600 hover:rounded-2xl  cursor-pointer">
                        <CiSearch className="h-7 w-7 fill-white" />
                        <li className="text-center text-xl font-normal">Search</li>
                    </div>
                </Link>

                <Link to="/explore">
                    <div className="flex gap-5 p-3 hover:bg-neutral-600 hover:rounded-2xl  cursor-pointer">
                        <MdOutlineExplore className="h-7 w-7 fill-white" />
                        <li className="text-center text-xl font-normal">Explore</li>
                    </div>
                </Link>

                <Link to="/create">
                    <div className="flex gap-5 p-3 hover:bg-neutral-600 hover:rounded-2xl  cursor-pointer">
                        <LuSquarePlus className="h-7 w-7" />
                        <li className="text-center text-xl font-normal">Create</li>
                    </div>
                </Link>

                <Link to="/profile">
                    <div className="flex items-center gap-5 p-3 hover:bg-neutral-600 hover:rounded-2xl cursor-pointer">
                        <img src={`http://localhost:5000/${userData.profileImage}`} alt="Profile" className='h-8 w-8 rounded-full' />
                        <li className="text-center text-xl font-normal">Profile</li>
                    </div>
                </Link>
                <Link to="/login">
                    <li className="h-14 w-40 mt-5 bg-blue-700 text-center p-3 rounded-3xl hover:bg-blue-900 hover:rounded-3xl cursor-pointer hover:scale-110 text-2xl font-medium">Log Out</li>
                </Link>
            </ul>
        </div>
    )
}

export default RightSide;