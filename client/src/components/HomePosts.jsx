import React from "react";
import { Link } from "react-router-dom";
import {IF} from '../url';

const HomePosts = ({ post }) => {
  return (
    
    <div className="w-full flex mt-8 space-x-4">
      {/* Left */}
      <div className="w-[35%] h-[200px] flex justify-center items-center">
        <img
          src={IF+post.photo}
          alt={post.photo}
          className="h-full w-full object-cover"
        />
      </div>
      {/* right */}
      <div className="flex-col w-[65%]">
        <h1 className="text-xl font-bold md:mb-2 mb-1 md:text-2xl text-white" >
          {post.title}
        </h1>
        <div className="flex mb-2 text-sm font-semibold text-gray-400 items-center justify-between md:mb-4">
          <p>@{post.username}</p>
          <div className="flex space-x-2">
            <p>{new Date(post.updatedAt).toString().slice(0, 15)}</p>
            <p className="hidden md:visible">{new Date(post.updatedAt).toString().slice(16, 24)}</p>
          </div>
        </div>
        <p className="text-sm text-white">{post.desc.slice(0, 200) + " .....read more"}</p>
      </div>
    </div>
 
  );
};

export default HomePosts;
