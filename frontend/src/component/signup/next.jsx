import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Logo from "../../assets/Logo.png"
import { TextGenerateEffect } from "../ui/text-animation"

function Next() {

    const [dateOfBirth, setDateOfBirth] = useState('');
    const [bio, setBio] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const token = localStorage.getItem('token');
        await axios.post(
          'http://localhost:5000/api/user/user-info',
          { dateOfBirth, bio },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        navigate('/upload-profile');
      } catch (err) {
        setError(err.response?.data?.error || 'Error updating user info');
      }
    };
  
    const words = `Momentra is a visual storytelling platform that combines the best elements of Instagram with innovative features to make sharing moments more interactive, meaningful, and community-driven. It focuses on authenticity, creativity, and deeper engagement rather than just likes and followers.`;

    return (
        <div className="flex">

            <div className="bg-black w-[50%] h-screen flex flex-col justify-center items-center gap-10">
                <img src={Logo} alt="" className="h-96 w-96s" />
                <h1 className="animate-text text-2xl bg-gradient-to-r from-slate-300 via-[#422730] to-orange-700 bg-clip-text text-transparent">
                    Share Stories, Build Connections
                </h1>
                <div className="w-[80%] text-center">
                    <TextGenerateEffect words={words} />;
                </div>

            </div>

            <div className="bg-black w-[50%] h-screen">
                <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <h2 className="mt-5 text-center leading-[50px] text-3xl font-bold tracking-tight text-white">
                            More Information
                        </h2>
                    </div>

                    <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form onSubmit={handleSubmit}
                            method="POST" className="space-y-5 ">

                            <div>
                                <label htmlFor="bio" className="block text-xl/8 font-medium text-white">
                                    Bio
                                </label>
                                <div className="mt-2">
                                    <textarea
                                        id="bio"
                                        name="bio"
                                        type="text"
                                        value={bio}
                                        onChange={(e) => setBio(e.target.value)}
                                        placeholder="Enter your Bio"
                                        className="w-full resize-none outline-none rounded-md bg-slate-800 px-3 py-1.5 text-lg text-white placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 "
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-xl/8 font-medium text-white">
                                    Date of Birth
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="date"
                                        name="date"
                                        type="date"
                                        placeholder="Enter your date of birth"
                                        required
                                        value={dateOfBirth}
                                        onChange={(e) => setDateOfBirth(e.target.value)}
                                        className="block w-full h-14 rounded-md bg-slate-800 px-3 py-1.5 text-lg text-white  placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                                    />
                                </div>
                            </div>
                            {error && <p style={{ color: 'red' }}>{error}</p>}

                            <div>
                                <button
                                    type="submit"
                                    className="flex w-48 ml-24 mt-10 justify-center rounded-2xl bg-indigo-600 px-3 py-3 text-3xl/8 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Next
                                </button>
                            </div>
                        </form>

                    </div>
                </div>


            </div>

        </div >
    )
}

export default Next;