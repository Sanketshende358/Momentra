import { Link } from "react-router-dom";
import Logo from "../../assets/Logo.png"
import React, { useState } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
function Forgot() {
    const [email, setEmail] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // Input validation
        if (!email || !currentPassword || !newPassword) {
            setError('Please fill in all fields');
            return;
        }

        try {
          const response = await axios.post('http://localhost:5000/api/auth/change-password', {
            email,
            currentPassword,
            newPassword,
          });
          setMessage(response.data.message);
    
          // Redirect to the login page after 2 seconds
          setTimeout(() => {
            navigate('/login');
          }, 2000);
        } catch (err) {
            if (err.response) {
                setError(err.response.data.message);
            } else {
                setError('An error occurred');
            }
        }
    };
    
    return (
        <div className="flex ">

            <div className="bg-black w-[50%] h-screen flex flex-col gap-10 justify-center items-center">

                <h2 class="animate-text text-7xl font-bold font-sans bg-gradient-to-r from-red-300 via-[#422730] to-orange-500 bg-clip-text text-transparent">Momentra</h2>

                <div class="md:w-[60%]">
                    <p class="text-2xl font-medium mt-3 text-white">Forgot Password</p>

                    <form onSubmit={handleSubmit} action="" class="flex flex-col gap-7">
                        <input
                            class="p-3 mt-8 rounded-xl border"
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input class="p-3 rounded-xl border"
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Enter current Password"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                        />
                        <input class="p-3 rounded-xl border"
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="Enter New Password"
                        />

                            <button class="w-44 ml-40 mt-5 bg-[#2e77ed] text-white text-xl font-semibold py-3 rounded-xl hover:scale-105 duration-300 hover:bg-[#2f6aa0]" type="submit">Forgot Password</button>

                        <hr />

                        <div className="flex">
                            <p className="text-white text-xl">if you don't want to change...</p>
                            <Link to="/login">
                                <button class="text-white text-2xl ml-32 w-28 p-2 bg-blue-600 font-semibold rounded-xl hover:scale-110 duration-300" type="submit">Login</button>
                            </Link>
                        </div>
                    </form>
                    {message && <p>{message}</p>}
                    {error && <p style={{ color: 'red' }}>{error}</p>}

                </div>
            </div>


            <div className="bg-black w-[50%] h-screen flex flex-col justify-center items-center gap-10 text-white">
                <img src={Logo} alt="" className="h-96 w-96s" />
                <h1 className="animate-text text-4xl bg-gradient-to-r from-slate-300 via-[#422730] to-orange-700 bg-clip-text text-transparent">
                    Share Stories, Build Connections
                </h1>
            </div>

        </div>
    )
}

export default Forgot;