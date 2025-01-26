import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Frontpage from "./component/frontpage/frontpage";
import SignUp from "./component/signup/signup"
import Next from "./component/signup/next"
import ProfileUpload from "./component/signup/profileuplode"
import Login from "./component/login/login";
import Home from "./component/home/home";
import Search from "./component/search/search";
import Explore from "./component/explore/explore"
import Forgot from "./component/login/forgotpass";
import Create from "./component/create/create";
import Profile from "./component/profile/profile"
import UserProfile from "./component/userprofile/userprofile";
import PostSaved from "./component/postsaved/postsaved"
import PostDetail from "./component/postsaved/fullpost"
function App() {
  
  return (

      <>
          <Router>
              <Routes>
                  <Route path="/" element={<Frontpage />} />
                  <Route path="/signup" element={<SignUp />} />
                  <Route path="/user-info" element={<Next />} />
                  <Route path="/upload-profile" element={<ProfileUpload />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/home" element={<Home />} />
                  <Route path="/search" element={<Search />} />
                  <Route path="/explore" element={<Explore />} />
                  <Route path="/forgot" element={<Forgot />} />
                  <Route path="/create" element={<Create />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/userprofile/:userId" element={<UserProfile />} />
                  <Route path="/PostSaved" element={<PostSaved />} />
                  <Route path="/postdetail/:postId" element={<PostDetail />} />
                </Routes>
          </Router>
      </>
  );
}
export default App;
