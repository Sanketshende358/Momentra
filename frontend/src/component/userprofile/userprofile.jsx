import RightSide from '../right/rightside';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {

    const { userId } = useParams(); // Get userId from the URL
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);
    const [isFollowing, setIsFollowing] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                // Fetch user details
                const userRes = await axios.get(`http://localhost:5000/api/user/${userId}`);
                setUser(userRes.data);

                // Fetch user posts
                const postsRes = await axios.get(`http://localhost:5000/api/post/user-posts/${userId}`);
                setPosts(postsRes.data);

                // Check if the current user is following this user
                const token = localStorage.getItem('token');
                if (token) {
                    const decoded = JSON.parse(atob(token.split('.')[1])); // Decode token to get user ID
                    const currentUserId = decoded.userId;
                    setIsFollowing(userRes.data.followers.includes(currentUserId));
                }
            } catch (err) {
                setError(err.response?.data?.error || 'Error fetching user profile');
            }
        };

        fetchUserProfile();
    }, [userId]);

    const handleFollow = async () => {
        try {
            const token = localStorage.getItem('token');
            await axios.post(
                `http://localhost:5000/api/user/follow/${userId}`,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setIsFollowing(true);
            setUser((prevUser) => ({
                ...prevUser,
                followers: [...prevUser.followers, JSON.parse(atob(token.split('.')[1])).userId],
            }));
        } catch (err) {
            setError(err.response?.data?.error || 'Error following user');
        }
    };

    const handleUnfollow = async () => {
        try {
            const token = localStorage.getItem('token');
            await axios.post(
                `http://localhost:5000/api/user/unfollow/${userId}`,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setIsFollowing(false);
            setUser((prevUser) => ({
                ...prevUser,
                followers: prevUser.followers.filter((followerId) => followerId !== JSON.parse(atob(token.split('.')[1])).userId),
            }));
        } catch (err) {
            setError(err.response?.data?.error || 'Error unfollowing user');
        }
    };

    if (error) {
        return <p style={{ color: 'red' }}>{error}</p>;
    }

    if (!user) {
        return <p>Loading...</p>;
    }

    return (

        <div className="flex bg-black text-white">
            <RightSide />

            <div className="w-[75%] px-5 py-10">
                {/* Profile Header */}
                <div className="pt-10">
                    <div className="flex flex-col items-center">

                        {user.profileImage && (
                            <img
                                src={`http://localhost:5000/${user.profileImage}`}
                                alt="Profile"
                                className='w-44 h-44 rounded-full object-cover border-2'
                            // style={{ width: '100px', height: '100px', borderRadius: '50%', marginRight: '10px' }}
                            />
                        )}
                        <div className='w-full flex flex-col items-center mt-2'>
                            <h2 className="text-2xl font-bold">{user.username}</h2>
                            <h1 className="text-xl font-bold mt-1">{user.name}</h1>

                            <div className='flex  mt-5'>
                                <button className='text-xl font-semibold rounded-2xl px-5 py-2'>Followers: {user.followers.length}</button>
                                <button className='text-xl font-semibold rounded-2xl px-5 py-2'>Following: {user.following.length}</button>
                            </div>

                            
                            <div className='flex gap-8 mt-5'>
                                {isFollowing ? (
                                    <button  className='w-36 h-14 bg-slate-900 text-xl font-semibold rounded-full border hover:scale-110' onClick={handleUnfollow}>Unfollow</button>
                                ) : (
                                    <button className='w-36 h-14 bg-slate-900 text-xl font-semibold rounded-full border hover:scale-110' onClick={handleFollow}>Follow</button>
                                )}
                                <button className='h-14 w-36 bg-slate-900 text-xl font-semibold rounded-full border hover:scale-110'>
                                    Message
                                </button>
                            </div>
                            <h1 className="text-xl font-normal mt-1">{user.bio}</h1>
                        </div>
                    </div>
                </div>

                <hr className='mt-10 border-1 border-zinc-800' />

                <div className='flex flex-col mt-10'>
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
                </div>
            </div>
        </div>
    );
};

export default UserProfile;