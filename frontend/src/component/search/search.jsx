import RightSide from "../right/rightside"
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { CiSearch } from "react-icons/ci";


function Search() {

    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.get(`http://localhost:5000/api/user/search?query=${query}`);
            setResults(res.data);
        } catch (err) {
            setError(err.response?.data?.error || 'Error searching users');
        }
    };
    return (
        <div className="flex bg-black text-white">
            <RightSide />

            <div className="w-[40%] mt-20 ml-20">

                <form className="flex"
                    onSubmit={handleSearch}>
                    <input
                        type="text"
                        placeholder="Search by name or username"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        required
                        className="bg-black border-l-2 border-y-2 outline-none w-[70%] h-14 px-4 text-xl rounded-l-2xl"
                    />
                    <button type="submit" className="flex justify-center items-center border-e-2 border-y-2 border-t-2 h-14 w-[15%] text-xl font-medium rounded-r-2xl">
                        <CiSearch className="h-8 w-10"/>
                    </button>
                </form>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <div className="mt-8">
                    {results.map((user) => (
                        <div
                            key={user._id}
                            style={{  padding: '10px', margin: '10px 0', cursor: 'pointer' }}
                            onClick={() => navigate(`/userprofile/${user._id}`)} // Navigate to user profile
                        >
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                {user.profileImage && (
                                    <img
                                        src={`http://localhost:5000/${user.profileImage}`}
                                        alt="Profile"
                                        style={{ width: '70px', height: '70px', borderRadius: '50%', marginRight: '10px' }}
                                    />
                                )}
                                <div className="ml-2">
                                    <p className="text-xl font-semibold">{user.name}</p>
                                    <p className="text-lg">@{user.username}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Search;