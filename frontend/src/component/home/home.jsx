import React, {  useEffect } from 'react';
import RightSide from "../../component/right/rightside";
import LeftSide from "../leftside/leftside"
import PostSection from './postsection';
import AllPost from "./post"
function Home() {


    return (
        <div className="flex bg-black h-auto text-white">

            <RightSide />

            <div className="w-[55%] h-screen overflow-y-scroll no-scrollbar">
                {/* create post */}
                <PostSection />

                {/* Post Section */}
                <AllPost />

            </div>

            <LeftSide />

        </div>
    )
}

export default Home;