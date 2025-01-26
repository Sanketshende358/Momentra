import React, { useState } from 'react';
import axios from 'axios';
import { SlCalender } from "react-icons/sl";
import { IoLocationOutline } from "react-icons/io5";
import user from "../../assets/user.png"
import { MdOutlineAddPhotoAlternate } from "react-icons/md";

function PostSection() {

    const [content, setContent] = useState('');
    const [media, setMedia] = useState(null);
    const [error, setError] = useState('');

    const handleFileChange = (e) => {
        setMedia(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('content', content);
        if (media) {
            formData.append('media', media);
        }

        try {
            const token = localStorage.getItem('token');
            const res = await axios.post('http://localhost:5000/api/post/create-post', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log('Upload response:', res.data); // Log the response for debugging
            setContent('');
            setMedia(null);
        } catch (err) {
            console.error('Upload error:', err.response?.data); // Log the error for debugging
            setError(err.response?.data?.error || 'Error creating post');
        }
    };


    return (
        <div>

            {/* Upload Post Section */}
            <form onSubmit={handleSubmit} className="w-full h-44 mt-3 p-5 flex gap-5 bg-neutral-800 rounded-2xl border border-stone-500">
                <img src={user} alt="Profile" className='h-14 w-14 rounded-full' />
                <textarea type="text"
                    placeholder="What's on your mind?"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="bg-transparent text-white overflow-scroll no-scrollbar text-[20px] w-[80%] h-24 resize-none outline-none p-3"
                />

                <div className="flex gap-5 mt-24 justify-center items-center">

                    <div style={{ display: "flex", }}>
                        <label
                            htmlFor="file-upload"
                            style={{
                                display: "flex",
                                cursor: "pointer",
                                backgroundColor: "#fffff",
                            }}
                        >
                            <MdOutlineAddPhotoAlternate className="w-7 h-7" />
                        </label>
                        <input
                            id="file-upload"
                            type="file"
                            onChange={handleFileChange} accept="image/*, video/*"
                            style={{
                                display: "none",
                            }}
                        />
                    </div>
                    <SlCalender className="w-7 h-7" />
                    <IoLocationOutline className="w-7 h-7" />
                    <button className="bg-blue-500 hover:bg-blue-700 h-10 w-24 font-semibold text-xl rounded-2xl">Post</button>
                </div>

            </form>
        </div>
    )
}

export default PostSection;