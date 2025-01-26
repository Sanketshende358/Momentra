import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaHeart, FaComment, FaShare } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function AllPost() {

  const [posts, setPosts] = useState([]);
  const [error, setError] = useState('');
  const [likedPosts, setLikedPosts] = useState(new Set()); // Track liked posts
  const navigate = useNavigate(); // Initialize useNavigate


  useEffect(() => {
    const fetchRandomPosts = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/post/random-posts');
        setPosts(res.data);

        // Check which posts the current user has liked
        const token = localStorage.getItem('token');
        if (token) {
          const decoded = JSON.parse(atob(token.split('.')[1])); // Decode token to get user ID
          const currentUserId = decoded.userId;

          const likedPostIds = new Set();
          res.data.forEach((post) => {
            if (post.likes.includes(currentUserId)) {
              likedPostIds.add(post._id);
            }
          });

          setLikedPosts(likedPostIds);
        }
      } catch (err) {
        setError(err.response?.data?.error || 'Error fetching random posts');
      }
    };

    fetchRandomPosts();
  }, []);

  const handleLike = async (postId) => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(
        `http://localhost:5000/api/post/posts/${postId}/like`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Update liked posts state
      setLikedPosts((prevLikedPosts) => {
        const newLikedPosts = new Set(prevLikedPosts);
        if (newLikedPosts.has(postId)) {
          newLikedPosts.delete(postId); // Unlike the post
        } else {
          newLikedPosts.add(postId); // Like the post
        }
        return newLikedPosts;
      });

      // Update posts state
      setPosts((prevPosts) =>
        prevPosts.map((post) => (post._id === postId ? res.data.post : post))
      );
    } catch (err) {
      setError(err.response?.data?.error || 'Error liking post');
    }
  };

  const handleComment = async (postId, text) => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(
        `http://localhost:5000/api/post/posts/${postId}/comment`,
        { text },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setPosts((prevPosts) =>
        prevPosts.map((post) => (post._id === postId ? res.data.post : post))
      );
    } catch (err) {
      setError(err.response?.data?.error || 'Error adding comment');
    }
  };

  const handleShare = async (postId) => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(
        `http://localhost:5000/api/post/posts/${postId}/share`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setPosts((prevPosts) =>
        prevPosts.map((post) => (post._id === postId ? res.data.post : post))
      );
    } catch (err) {
      setError(err.response?.data?.error || 'Error sharing post');
    }
  };

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  if (posts.length === 0) {
    return <p>No posts found.</p>;
  }

  return (

    <div className='mt-5 h-screen '>
      {posts.map((post) => (
        <div key={post._id} style={{ padding: '20px', margin: '10px 0' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {post.userId.profileImage && (
              <img
                src={`http://localhost:5000/${post.userId.profileImage}`}
                alt="Profile"
                style={{ width: '60px', height: '60px', borderRadius: '50%', marginRight: '10px', cursor: "pointer" }}
                onClick={() => navigate(`/userprofile/${post.userId._id}`)} 
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
          <p className='mt-3 text-lg'>{post.content}</p>
          {post.media && (
            <div>
              {post.mediaType === 'image' ? (
                <img src={`http://localhost:5000/${post.media}`} alt="Post Media" style={{ maxWidth: '100%', borderRadius: '2%', marginTop: '20px' }} />
              ) : (
                <video controls style={{ maxWidth: '100%', borderRadius: '2%', marginTop: "20px" }}>
                  <source src={`http://localhost:5000/${post.media}`} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )}
              </div>
            )}
            <div style={{ display: 'flex', gap: '30px', marginTop: '30px' }}>
              <button
                onClick={() => handleLike(post._id)}
                style={{ display: 'flex', alignItems: 'center', gap: '5px', border: 'none', background: 'none' }}
              >
                <FaHeart
                  style={{ width: "30px", height: "30px", color: likedPosts.has(post._id) ? 'red' : 'gray', cursor: 'pointer' }}
                />{' '}
                {post.likes.length}
              </button>
              <button
                onClick={() => handleComment(post._id, prompt('Enter your comment:'))}
                style={{ display: 'flex', alignItems: 'center', gap: '5px', border: 'none', background: 'none' }}
              >
                <FaComment style={{ width: "30px", height: "30px", color: 'blue', cursor: 'pointer' }} /> {post.comments.length}
              </button>
              <button
                onClick={() => handleShare(post._id)}
                style={{ display: 'flex', alignItems: 'center', gap: '5px', border: 'none', background: 'none' }}
              >
                <FaShare style={{ width: "30px", height: "30px", color: 'green', cursor: 'pointer' }} /> {post.shares}
              </button>
            </div>
            <div style={{ marginTop: '10px' }}>
              <h4>Comments:</h4>
              {post.comments.map((comment) => (
                <div key={comment._id} style={{ marginBottom: '10px' }}>
                  <p style={{ fontWeight: 'bold' }}>{comment.userId.name}:</p>
                  <p>{comment.text}</p>
                </div>
              ))}
            </div>
            <p style={{ fontSize: '12px', color: '#666' }}>
              Posted on: {new Date(post.createdAt).toLocaleString()}
            </p>
        </div>
      ))}
    </div>
  )
}


export default AllPost;