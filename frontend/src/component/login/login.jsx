import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Logo from "../../assets/Logo.png"
function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
        localStorage.setItem('token', res.data.token); // Store token in localStorage
        navigate('/home');
      } catch (err) {
        setError(err.response?.data?.error || 'Error logging in');
      }
    };
  
    return (
        <div className="flex">

            <div className="bg-black w-[50%] h-screen flex flex-col gap-10 justify-center items-center">

                <h2 class="animate-text text-7xl font-bold font-sans bg-gradient-to-r from-red-300 via-[#422730] to-orange-500 bg-clip-text text-transparent">Momentra</h2>

                <div class="md:w-[60%]">
                    <p class="text-lg mt-4 text-white">If you already a member, easily log in now.</p>

                    <form action="" onSubmit={handleSubmit} class="flex flex-col gap-7">
                        <input class="p-3 mt-8 rounded-xl border"
                            type="text" name="username"
                            placeholder="Enter Email or Username" 
                            value={email} onChange={(e) => setEmail(e.target.value)} 
                            />
                        <div class="relative">
                            <input class="p-3 rounded-xl border w-full"
                                type="password"
                                name="password"
                                id="password"
                                placeholder="Password"
                                value={password} onChange={(e) => setPassword(e.target.value)} 
                            />
                        </div>
                        {error && <p style={{ color: 'red' }}>{error}</p>}

                        <button class="w-40 ml-40 mt-5 bg-[#2e77ed] text-white text-xl font-semibold py-3 rounded-xl hover:scale-105 duration-300 hover:bg-[#2f6aa0]" type="submit">Login</button>

                    </form>

                    <Link to="/forgot">
                        <button class="mt-8 text-white text-lg hover:text-blue-400 hover:text-xl py-5 playfair tooltip">Forget password?</button>
                    </Link>
                    <div class="mt-4 text-sm flex justify-between items-center container-mr">
                        <p class="mr-3 md:mr-0 text-white text-xl">If you don't have an account..</p>
                        <Link to="/signup"><button class="hover:border text-lg font-semibold register text-white bg-[#002D74] hover:border-gray-400 rounded-xl py-3 px-6 hover:scale-110 hover:bg-[#002c7424] duration-300">Register</button> </Link>
                    </div>

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

export default Login;