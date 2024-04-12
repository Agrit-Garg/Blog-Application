import React, { useState, useEffect, useContext } from "react";
import Comment from "../components/Comment.jsx";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { URL,IF } from "../url.js";
import { useParams,useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext.jsx";


const PostDetails = () => {
  const {user}= useContext(UserContext)
  const navigate = useNavigate();
  // we have taken this postid from url
  const postId = useParams().id;
  const [post, setPost] = useState({});

  const fetchPost = async () => {
    try {
      const res = await axios.get(URL + "/api/post/" + postId);
      // console.log(res.data);
      setPost(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [postId]);

  const handleDeletePost = async()=>{
    try {
      const res = await axios.delete(URL+"/api/post/"+postId)
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <div className="px-8 md:px-[200px] mt-8">
        <div className="flex justify-between items-center ">
          <h1 className="text-2xl font-bold text-black md:text-xl">
            {post.title}
          </h1>
          {user?._id === post?.uid && (
            <div className="flex items-center justify-center space-x-2">
              <p>
                <BiEdit />
              </p>
              <p>
                <MdDelete className="cursor-pointer" onClick={handleDeletePost}/>
              </p>
            </div>
          )}
        </div>
        <div className="flex items-center justify-between mt-2 md:mt-4">
          <p>@{post.username}</p>
          <div className="flex space-x-2">
            <p>{new Date(post.updatedAt).toString().slice(0, 15)}</p>
            <p>{new Date(post.updatedAt).toString().slice(16, 24)}</p>
          </div>
        </div>
        <img src={IF+post.photo} className="w-full mx-auto mt-8" alt="" />
        <p className="mx-auto mt-8">{post.desc}</p>

        <div className="flex items-center mt-8 space-x-4 font-semibold">
          <p>Categories</p>
          <div className="flex justify-center items-center space-x-2">
            {post.category?.map((c, i) => (
              <>
                <div key={i} className="bg-gray-300 rounded-lg px-3 py-1">
                  {c}
                </div>
              </>
            ))}
          </div>
        </div>
        <div className="flex flex-col mt-4">
          <h3 className="mt-6 mb-4 font-semibold">Comments:</h3>
          <Comment />
          <Comment />
          <Comment />
        </div>

        {/* Write a Comment */}
        <div className="flex flex-col mt-4 md:flex-row">
          <input
            type="text"
            placeholder="write a comment"
            className="md:w-[80%] outline-none px-4 mt-4 md:mt-0"
          />
          <button className="bg-black text-sm text-white px-4 py-2 md:w-[20%] mt-4 md:mt-0">
            Add Comment
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
