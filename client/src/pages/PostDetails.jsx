import React, { useState, useEffect, useContext } from "react";
import Comment from "../components/Comment.jsx";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { URL, IF } from "../url.js";
import { useParams, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext.jsx";

const PostDetails = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  // we have taken this postid from url
  const postId = useParams().id;
  const [post, setPost] = useState({});
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  const fetchPost = async () => {
    try {
      const res = await axios.get(URL + "/api/post/" + postId);
      // console.log(res.data);
      setPost(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchComment = async () => {
    const res = await axios.get(`${URL}/api/comment/post/${postId}`);
    // console.log(res.data[0].comment);
    setComments(res.data);
    // console.log(comments)
  };

  useEffect(() => {
    fetchPost();
    fetchComment();
  }, [postId]);

  const handleDeletePost = async () => {
    try {
      const res = await axios.delete(URL + "/api/post/" + postId);
      console.log(res);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handlePostComment = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${URL}/api/comment/create`,
        {
          author: user.username,
          uid: user._id,
          comment: comment,
          postId: postId,
        },
        { withCredentials: true }
      );
      setComment("");
      fetchComment();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className="px-8 md:px-[200px] mt-8">
        <div className="flex justify-between items-center ">
          <h1 className="text-2xl font-bold text-white md:text-xl">
            {post.title}
          </h1>
          {user?._id === post?.uid && (
            <div className="flex items-center justify-center space-x-2 text-gray-300">
              <p>
                <BiEdit
                  className="cursor-pointer"
                  onClick={() => navigate("/edit/" + postId)}
                />
              </p>
              <p>
                <MdDelete
                  className="cursor-pointer"
                  onClick={handleDeletePost}
                />
              </p>
            </div>
          )}
        </div>
        <div className="flex items-center justify-between mt-2 md:mt-4 text-gray-300">
          <p>@{post.username}</p>
          <div className="flex space-x-2">
            <p>{new Date(post.updatedAt).toString().slice(0, 15)}</p>
            <p>{new Date(post.updatedAt).toString().slice(16, 24)}</p>
          </div>
        </div>
        <img src={IF + post.photo} className="flex w-full border border-black mx-auto mt-8" alt="" />
        <p className="mx-auto mt-8 text-gray-300">{post.desc}</p>

        <div className="flex items-center mt-8 space-x-4 font-semibold">
          <p className="text-white">Categories :</p>
          <div className="flex justify-center items-center space-x-2">
            {post.category?.map((c, i) => (
              <>
                <div key={i} className="bg-gray-200 rounded-lg px-3 py-1">
                  {c}
                </div>
              </>
            ))}
          </div>
        </div>
        <div className="flex flex-col mt-4">
          <h3 className="mt-6 mb-4 font-semibold text-white">Comments :</h3>
          {comments?.map((c) => {
            return <Comment key={c._id} comment={c} />;
          })}
        </div>

        {/* Write a Comment */}
        <div className="flex flex-col mt-4 md:flex-row">
          <input
            type="text"
            placeholder="write a comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="md:w-[80%] border border-gray-300 rounded-2xl px-4 mx-2 mt-4 md:mt-0 outline-none placeholder:text-gray-500"
          />
          <button
            onClick={handlePostComment}
            className="text-sm text-white px-4 py-2 rounded-2xl md:w-[20%] mt-4 md:mt-0 font-semibold bg-purple-700 hover:bg-purple-600"
          >
            Add Comment
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
