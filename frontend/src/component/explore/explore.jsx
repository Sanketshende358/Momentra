import RightSide from "../../component/right/rightside"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function Explore() {

    const [posts, setPosts] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
      const fetchRandomPosts = async () => {
        try {
          const res = await axios.get('http://localhost:5000/api/post/random-posts');
          setPosts(res.data);
        } catch (err) {
          setError(err.response?.data?.error || 'Error fetching random posts');
        }
      };
  
      fetchRandomPosts();
    }, []);
  
    if (error) {
      return <p style={{ color: 'red' }}>{error}</p>;
    }
  

    return (
        <div className="flex bg-black text-white">

            <RightSide />

            <div className="className='mt-5'" style={{ display: 'flex', flexWrap: 'wrap' }}>
            {posts.map((post) => (
            <div key={post._id}
            onClick={() => navigate(`/postdetail/${post._id}`)} // Navigate to post detail page
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

        </div>
    )
}

export default Explore;