import React, { useContext } from "react";
import { MdDelete } from "react-icons/md";
import { UserContext } from "../context/UserContext";
import axios from 'axios';
import { URL } from "../url";

const Comment = ({comment}) => {
  const {user} = useContext(UserContext)

  const handleCommentDelete= async()=>{
      try {
        const res = await axios.delete(URL+"/api/comment/"+comment._id,{withCredentials:true})
        // console.log(res)
        window.location.reload(true)
      } catch (error) {
        console.log(error);
      }
  }

  return (
    <div className="px-2 py-2 bg-gray-200 rounded-lg my-2">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-gray-600">@{comment.author}</h3>
        <div className="flex justify-center items-center space-x-4">
            <p className="text-gray-500 text-sm">{new Date(comment.updatedAt).toString().slice(0, 15)}</p>
            <p className="text-gray-500 text-sm">{new Date(comment.updatedAt).toString().slice(16, 24)}</p>
          {user._id === comment.uid && <div className="flex items-center justify-center space-x-2">
            <p className="cursor-pointer">
              <MdDelete onClick={handleCommentDelete}/>
            </p>
          </div>}
        </div>
      </div>
      <p className="px-4 mt-2">{comment.comment}</p>
    </div>
  );
};

export default Comment;
