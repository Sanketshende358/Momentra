import * as React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Logo from "../../assets/Logo.png"
import { TextGenerateEffect } from "../ui/text-animation"

const SignUp = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/signup', { name, username, email, password });
      localStorage.setItem('token', res.data.token); // Store token in localStorage
      navigate('/user-info');
    } catch (err) {
      setError(err.response?.data?.error || 'Error signing up');
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
                        <h2 className="mt-5 text-center leading-[50px] text-4xl font-bold tracking-tight text-white">
                            Sign Up to the <span className="animate-text text-6xl bg-gradient-to-r from-red-300 via-[#422730] to-orange-500 bg-clip-text text-transparent"> Momentra </span>
                        </h2>
                    </div>

                    <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form onSubmit={handleSubmit}
                            method="POST" className="space-y-5 ">

                            <div>
                                <label htmlFor="name" className="block text-lg/8 font-medium text-white">
                                    Name
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        placeholder="Enter your Name"
                                        required
                                        value={name} onChange={(e) => setName(e.target.value)} 
                                        className="block w-full h-11 rounded-md bg-white px-3 py-1.5 text-base text-black outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="username" className="block text-lg/8 font-medium text-white">
                                    Username
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="username"
                                        name="username"
                                        type="text"
                                        placeholder="Enter Username"
                                        required
                                        value={username} onChange={(e) => setUsername(e.target.value)} 
                                        className="block w-full h-11 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-lg/8 font-medium text-white">
                                    Email address
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder="Enter your Email"
                                        required
                                        value={email} onChange={(e) => setEmail(e.target.value)} 
                                        className="block w-full h-11 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    />
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between">
                                    <label htmlFor="password"  className="block text-lg/8 font-medium text-white">
                                        Password
                                    </label>
                                    <div className="text-sm">
                                        <a href="#" className="font-semibold text-slate-200 hover:text-indigo-500">
                                            Forgot password?
                                        </a>
                                    </div>
                                </div>
                                <div className="mt-1">
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        placeholder="Enter Password"
                                        required
                                        value={password} onChange={(e) => setPassword(e.target.value)}
                                        className="block w-full h-11 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    />
                                </div>
                            </div>

                            {error && <p style={{ color: 'red' }}>{error}</p>}

                            <div>
                                <button
                                    type="submit"
                                    className="flex w-48 ml-24 mt-10 justify-center rounded-2xl bg-indigo-600 px-3 py-3 text-3xl/8 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Sign up
                                </button>
                            </div>
                        </form>

                    </div>
                </div>


            </div>

        </div >
    )
}

export default SignUp;