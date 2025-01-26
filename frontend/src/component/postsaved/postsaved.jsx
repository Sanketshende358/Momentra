
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export default function PostSaved() {

    const [posts, setPosts] = useState([]);
    const [error, setError] = useState('');
      const navigate = useNavigate();
  
    useEffect(() => {
      const fetchUserPosts = async () => {
        try {
          const token = localStorage.getItem('token');
          const decoded = JSON.parse(atob(token.split('.')[1])); // Decode token to get user ID
          const userId = decoded.userId;
  
          const res = await axios.get(`http://localhost:5000/api/post/user-posts/${userId}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setPosts(res.data);
        } catch (err) {
          setError(err.response?.data?.error || 'Error fetching user posts');
        }
      };
  
      fetchUserPosts();
    }, []);
  
    if (error) {
      return <p style={{ color: 'red' }}>{error}</p>;
    }
  

    return (
        <div className='mt-5' style={{ display: 'flex', flexWrap: 'wrap' }}>
          {posts.map((post) => (
            <div key={post._id}
            onClick={() => navigate(`/postdetail/${post._id}`)} 
            style={{ padding: '20px', margin: '10px', flexBasis: '30%' }}>
              {post.media && (
                <div>
                  {post.mediaType === 'image' ? (
                    <img src={`http://localhost:5000/${post.media}`} alt="Post Media" style={{ maxWidth: '100%', borderRadius: '2%', marginTop: '20px' }} />
                  ) : (
                    <video controls style={{ maxWidth: '100%', borderRadius: '2%' }}>
                      <source src={`http://localhost:5000/${post.media}`} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      );
    }
