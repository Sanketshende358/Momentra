import React, { useState } from 'react';
import axios from 'axios';
import Logo from "../../assets/Logo.png"
import { TextGenerateEffect } from "../ui/text-animation"
import { useNavigate } from 'react-router-dom';

function ProfileUplode() {

    const [profileImage, setProfileImage] = useState(null);
    const [error, setError] = useState('');
    const navigate = useNavigate();
  
    const handleFileChange = (e) => {
      setProfileImage(e.target.files[0]);
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append('profileImage', profileImage);
  
      try {
        const token = localStorage.getItem('token');
        const res = await axios.post('http://localhost:5000/api/user/upload-profile', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('Upload response:', res.data); // Log the response for debugging
        alert("profile photo Uploaded")
        navigate('/home'); // Redirect to Home Page after successful upload
      } catch (err) {
        console.error('Upload error:', err.response?.data); // Log the error for debugging
        setError(err.response?.data?.error || 'Error uploading profile image');
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
                            Uplode your Profile
                        </h2>
                    </div>

                    <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form onSubmit={handleSubmit}
                            method="POST">

                            <div className="h-96 flex flex-col gap-10 items-center justify-center">

                                {/* File input for uploading an image */}
                                <input
                                    id="upload-input"
                                    type="file"
                                    className="ml-52"
                                    onChange={handleFileChange}
                                />

                            </div>
                            );
                            {error && <p style={{ color: 'red' }}>{error}</p>}

                            <div>
                                <button
                                    type="submit"
                                    className="flex w-48 ml-24 mt-10 justify-center rounded-2xl bg-indigo-600 px-3 py-3 text-3xl/8 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </div >
    )
}

export default ProfileUplode;