import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RightSide from '../right/rightside';
import PostSaved from "../postsaved/postsaved"

const Profile = () => {

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
    return <p>Loding...</p>
  }

  return (

    <div className="flex bg-black text-white">
      <RightSide />

      <div className="w-[75%] px-5 py-10">
        {/* Profile Header */}
        <div className="pt-10">
          <div className="flex flex-col items-center">

            <img src={`http://localhost:5000/${userData.profileImage}`} alt="Profile" className='w-44 h-44 rounded-full object-cover border-2' />

            <div className='w-full flex flex-col items-center mt-2'>
              <h2 className="text-2xl font-bold">{userData.username}</h2>
              <h1 className="text-xl font-bold mt-1">{userData.name}</h1>

              <div className='flex gap-8 mt-5'>
                <button className='text-xl font-semibold bg-slate-900 border rounded-2xl px-5 py-2'>Followers: {userData.followers.length}</button>
                <button className='text-xl font-semibold bg-slate-900 border rounded-2xl px-5 py-2'>Following: {userData.following.length}</button>
              </div>

              <p className="text-lg mt-5">{userData.bio}</p>

            </div>
          </div>
        </div>

        <hr className='mt-10 border-1 border-zinc-800' />

        <div className="flex flex-col mt-10">
          <PostSaved />
        </div>
      </div>
    </div>
  );
};

export default Profile;