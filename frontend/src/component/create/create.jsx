import React, { useState } from 'react';
import RightSide from '../right/rightside';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Create = () => {
  const [content, setContent] = useState('');
  const [media, setMedia] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

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
      navigate('/home'); // Redirect to posts page after creating post
    } catch (err) {
      console.error('Upload error:', err.response?.data); // Log the error for debugging
      setError(err.response?.data?.error || 'Error creating post');
    }
  };


  return (

    <div className='flex h-screen bg-black text-white'>

        <RightSide />

      <form onSubmit={handleSubmit} className="m-14 ml-40 w-[50%]">
        <h2 className="text-3xl font-bold mb-4 ">Create a New Post</h2>
        
        <div className="mb-8 mt-10">
          <label className="block text-xl font-bold mb-4" htmlFor="content">
            Content
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-[60%] shadow resize-none text-lg  bg-transparent border rounded-2xl py-4 px-4 leading-tight focus:outline-none focus:shadow-outline"
            rows="4"
            placeholder="Write your post content here"
          />
        </div>

        <div className="mb-10 ">
          <label className="block text-lg font-bold mb-5" htmlFor="image">
            Upload Image or Video (optional)
          </label>
          <input
            type="file"
            onChange={handleFileChange} accept="image/*, video/*" 
            className="shadow appearance-none border rounded w-[60%] py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" >
          Create Post
        </button>
      </form>
      </div>
  );
};

export default Create;