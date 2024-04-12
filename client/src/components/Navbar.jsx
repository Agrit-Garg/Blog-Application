import React, { useContext, useState } from "react";
import { Link, useNavigate, useLocation} from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import { URL } from "../url";

const Navbar = () => {
  const { user } = useContext(UserContext);
  const { setUser } = useContext(UserContext);

  // only show search bar if it is a home page that's why finding the path through useLocation
  const path= useLocation().pathname  

  const [prompt,setPrompt] =useState("")
  // console.log(prompt)
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      const res = await axios.get(URL + "/api/auth/logout", {
        withCredentials: true,
      });
      setUser(null);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-between px-6 md:px-[200px] py-4 bg-gray-200">
      <h1 className="text-lg md:text-xl font-extrabold">
        <Link to="/"> Blog</Link>
      </h1>
      {path === '/' && <div className="flex justify-center items-center space-x-6">
        <p className="cursor-pointer" onClick={()=>navigate(prompt?"?search="+prompt:navigate('/'))}>
          <IoSearch />
        </p>
        <input
          type="text"
          placeholder="Search a post"
          className="px-3 py-1 rounded-3xl"
          onChange={(e)=>{setPrompt(e.target.value)}}
        />
      </div>}
      <div className="flex items-center justify-center space-x-2 md:space-x-4">
        <h3>
          {user ? (
            <Link to="/create">Create</Link>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </h3>
      
        <h3>
          {user ? (
            <Link onClick={handleLogout}>Logout</Link>
          ) : (
            <Link to="/register">Register</Link>
          )}
        </h3>
      </div>
    </div>
  );
};

export default Navbar;
