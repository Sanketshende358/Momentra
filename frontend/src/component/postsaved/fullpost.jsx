import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import RightSide from '../right/rightside';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const PostDetail = () => {
  const { postId } = useParams(); // Get postId from the URL
  const [post, setPost] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/post/posts/${postId}`);
        setPost(res.data);
      } catch (err) {
        setError(err.response?.data?.error || 'Error fetching post');
      }
    };

    fetchPost();
  }, [postId]);

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  if (!post) {
    return <p>Loading...</p>;
  }

  return (
    <div className='flex bg-black text-white'>
      <RightSide />

<div className='w-[70%] mt-10'>
      <div style={{ padding: '10px', margin: '10px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {post.userId.profileImage && (
            <img
              src={`http://localhost:5000/${post.userId.profileImage}`}
              alt="Profile"
              onClick={() => navigate(`/userprofile/${post.userId._id}`)} 
              style={{ width: '50px', height: '50px', borderRadius: '50%', marginRight: '10px', cursor: "pointer" }}
            />
          )}
          
          <div>
              <p
              onClick={() => navigate(`/userprofile/${post.userId._id}`)} 
              style={{ fontWeight: 'semibold', fontSize: "20px", cursor: "pointer"  }}>
                {post.userId.name}
              </p>
              <p
              style={{ fontWeight: 'normal', fontSize: "15px", cursor: "pointer"  }}
               onClick={() => navigate(`/userprofile/${post.userId._id}`)}>
                @{post.userId.username}
              </p>
            </div>
        </div>
        <p className='mt-5 text-xl'>{post.content}</p>
        {post.media && (
          <div className='mt-5'>
            {post.mediaType === 'image' ? (
              <img src={`http://localhost:5000/${post.media}`} alt="Post Media" style={{ maxWidth: '80%', borderRadius:"2%" }} />
            ) : (
              <video controls style={{ maxWidth: '100%' }}>
                <source src={`http://localhost:5000/${post.media}`} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
          </div>
        )}
      </div>
      </div>
    </div>
  );
};

export default PostDetail;