import React, { useContext, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import { URL } from "../url";

const Navbar = () => {
  const { user } = useContext(UserContext);
  const { setUser } = useContext(UserContext);

  // only show search bar if it is a home page that's why finding the path through useLocation
  const path = useLocation().pathname;

  const [prompt, setPrompt] = useState("");
  // console.log(prompt)
  const navigate = useNavigate();

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
    <div
      className="flex items-center justify-between px-6 md:px-[200px] py-4"
      style={{ backgroundColor: "rgb(26, 23, 23)" }}
    >
      <h1 className="text-xl md:text-2xl text-white font-extrabold">
        <Link to="/"> Blog</Link>
      </h1>
      {path === "/" && (
        <div className="flex justify-center items-center space-x-2 md:space-x-5">
          <p
            className="cursor-pointer text-white text-sm ml-2 md:text-2xl"
            onClick={() =>
              navigate(prompt ? "?search=" + prompt : navigate("/"))
            }
          >
            <IoSearch />
          </p>
          <input
            type="text"
            placeholder="Search a post"
            className="px-3 md:py-1 border border-gray-700 rounded-2xl w-36 md:w-auto outline-none"
            onChange={(e) => {
              setPrompt(e.target.value);
            }}
          />
        </div>
      )}
      <div className="flex items-center justify-center space-x-2 md:space-x-4">
        <h3>
          {user ? (
            <Link
              to="/create"
              className="text-sm md:text-lg text-white p-1 md:p-2 rounded-lg bg-purple-700 hover:bg-purple-600"
            >
              Create +
            </Link>
          ) : (
            <Link
              to="/login"
              className="text-sm md:text-lg text-white p-1 ml-2 md:p-2 rounded-lg bg-purple-700 hover:bg-purple-600"
            >
              Login
            </Link>
          )}
        </h3>

        <h3>
          {user ? (
            <Link
              onClick={handleLogout}
              className=" text-sm md:text-lg text-white p-1 md:p-2 rounded-lg bg-purple-700 hover:bg-purple-600"
            >
              Logout
            </Link>
          ) : (
            <Link
              to="/register"
              className="text-sm md:text-lg text-white p-1 md:p-2 rounded-lg bg-purple-700 hover:bg-purple-600"
            >
              Register
            </Link>
          )}
        </h3>
      </div>
    </div>
  );
};

export default Navbar;
