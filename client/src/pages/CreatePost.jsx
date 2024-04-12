import React, { useContext, useState } from "react";
import { ImCross } from "react-icons/im";
import {UserContext} from '../context/UserContext';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { URL } from "../url";

const CreatePost = () => {
  const [data, setData] = useState({
    title: "",
    desc: "",
    file: null,
  });
  const {user}=useContext(UserContext)
  const [cat, setCat] = useState("");
  const [cats, setCats] = useState([]);
  const navigate = useNavigate();

  const deleteCategory = (i) => {
    let updatedCats = [...cats];
    updatedCats.splice(i,1);
    setCats(updatedCats);
  };

  const addCategory = () => {
    let updatedCats = [...cats];
    updatedCats.push(cat);
    setCat("");
    setCats(updatedCats);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0]; // Get the file from the input
    setData({
      ...data,
      file: file, // Update the file in the state
    });
  };

  const handleRegistration = async(e) => {
    e.preventDefault();
    const post = {
      title:data.title,
      desc:data.desc,
      username:user.username,
      uid:user._id,
      category:cats,
    }
    
    if(data.file){
      const info = new FormData();  
      const filename=Date.now()+data.file.name
      info.append("img",filename)
      info.append("file",data.file)
      post.photo=filename
      // console.log(info)
      // console.log(post);
      // img upload
      try{
        const imgUpload=await axios.post(URL+"/api/upload",info)
        console.log(imgUpload.data)
      }
      catch(err){
        console.log(err)
      }
    }
    //post upload
    try{
      const res=await axios.post(URL+"/api/post/create",post,{withCredentials:true})
      navigate("/posts/post/"+res.data._id)
      console.log(res.data)
  
    }
    catch(err){
      console.log(err)
    }
  }

  return (
    <>
      <div className="flex justify-center items-center min-h-screen px-4">
        <div className="flex flex-col items-center py-10 sm:justify-center w-full">
          <div className="w-full px-6 py-6  bg-white dark:bg-gray-900 shadow-md rounded-md sm:rounded-lg max-w-3xl">
            <h1 className="font-bold md:text-2xl text-xl mb-8 mx-auto text-center">
              Create Post
            </h1>
            <form action="" onSubmit={handleRegistration} className="group">
              <div>
                <label
                  htmlFor="username"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Title
                </label>
                <div className="flex flex-col items-start">
                  <input
                    type="text"
                    name="title"
                    placeholder="Enter a title"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500 placeholder-gray-300"
                    required
                    value={data.title}
                    onChange={(e) => {
                      setData({
                        ...data,
                        title: e.target.value,
                      });
                    }}
                  />
                </div>
              </div>

              <div className="mt-4">
                <label
                  htmlFor="file"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Upload Image
                </label>
                <div className="flex flex-col items-start">
                  <input
                    type="file"
                    name="file"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500 placeholder-gray-300 "
                    required
                    onChange={handleFileChange} // Call handleFileChange when file changes
                  />
                </div>
              </div>

              <div className="mt-4">
                <label
                  htmlFor="category"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Category
                </label>
                <div className="flex items-center space-x-4 md:space-x-8">
                  <input
                    type="text"
                    name="category"
                    placeholder="Enter post category"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500 placeholder-gray-300 "
                    value={cat}
                    onChange={(e) => {
                      setCat(e.target.value);
                    }}
                  />
                  <div
                    onClick={addCategory}
                    className="bg-black text-white px-4 py-2 font-semibold cursor-pointer rounded-lg"
                  >
                    Add
                  </div>
                </div>

                {/* categories */}
                <div className="flex px-4 mt-3">
                  {cats?.map((c, i) => (
                    <div
                      key={i}
                      className="flex justify-center items-center space-x-2 mr-4 bg-gray-200 px-2 py-1 rounded-md"
                    >
                      <p>{c}</p>
                      <p
                        onClick={() => deleteCategory(i)}
                        className="text-white bg-black rounded-full cursor-pointer p-1 text-sm"
                      >
                        <ImCross />
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4">
                <label
                  htmlFor="Desc"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Description
                </label>
                <div className="flex flex-col items-start">
                  <textarea
                    rows={10}
                    cols={15}
                    name="desc"
                    placeholder="Description of your post"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500 placeholder-gray-300 "
                    required
                    value={data.desc}
                    onChange={(e) => {
                      setData({
                        ...data,
                        desc: e.target.value,
                      });
                    }}
                  />
                </div>
              </div>

              <div className="flex items-center mt-4">
                <button
                  type="submit"
                  className="w-full text-white bg-purple-700 hover:bg-purple-600 focus:ring-1 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-3 text-center mt-2 "
                >
                  Create Post
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreatePost;
