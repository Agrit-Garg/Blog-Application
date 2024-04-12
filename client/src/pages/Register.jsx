import React, { useState } from "react";
import axios from "axios";
import { URL } from "../url";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(false);

  const navigate = useNavigate();
  const handleRegistration = async (e) => {
    try {
      e.preventDefault();
      const res = await axios.post(URL + "/api/auth/register", data);
      // console.log(res);
      setError(false);
      navigate("/login");
      
    } catch (err) {
      setError(true);
      console.log(err);
    }
  };

  const { ...allData } = data;

  // Disable submit button until all fields are filled in
  const canSubmit = [...Object.values(allData)].every(Boolean);

  return (
    <div className="flex justify-center items-center min-h-screen px-4">
      <div className="flex flex-col items-center py-10 sm:justify-center w-full">
        <div className="w-full px-6 py-6  bg-white dark:bg-gray-900 shadow-md rounded-md sm:rounded-lg max-w-sm">
          <h1 className="font-bold md:text-2xl text-xl mb-2 mx-auto text-center">
            Sign UP
          </h1>
          {error && (
            <h3 className="text-red-500 text-sm mb-2 mx-auto text-center">
              Something Went Wrong
            </h3>
          )}

          <form action="" onSubmit={handleRegistration} className="group">
            <div>
              <label
                htmlFor="username"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                User Name
              </label>
              <div className="flex flex-col items-start">
                <input
                  type="text"
                  name="username"
                  placeholder="User Name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500 placeholder-gray-300 valid:[&:not(:placeholder-shown)]:border-green-500 [&:not(:placeholder-shown):not(:focus):invalid~span]:block invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-400"
                  required
                  pattern="[0-9a-zA-Z ]{6,}"
                  onChange={(e) => {
                    setData({
                      ...data,
                      username: e.target.value,
                    });
                  }}
                />
                <span className="mt-1 hidden text-sm text-red-400">
                  User name must be at least 6 characters long
                </span>
              </div>
            </div>
            <div className="mt-4">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Email
              </label>
              <div className="flex flex-col items-start">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500 placeholder-gray-300 valid:[&:not(:placeholder-shown)]:border-green-500 [&:not(:placeholder-shown):not(:focus):invalid~span]:block invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-400"
                  autoComplete="off"
                  required
                  pattern="[a-z0-9._+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                  onChange={(e) => {
                    setData({
                      ...data,
                      email: e.target.value,
                    });
                  }}
                />
                <span className="mt-1 hidden text-sm text-red-400">
                  Please enter a valid email address.{" "}
                </span>
              </div>
            </div>

            <div className="mt-4">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Password
              </label>
              <div className="flex flex-col items-start">
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500 placeholder-gray-300 valid:[&:not(:placeholder-shown)]:border-green-500 [&:not(:placeholder-shown):not(:focus):invalid~span]:block invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-400"
                  autoComplete="off"
                  required
                  pattern="[0-9a-zA-Z]{8,}"
                  onChange={(e) => {
                    setData({
                      ...data,
                      password: e.target.value,
                    });
                  }}
                />
                <span className="mt-1 hidden text-sm text-red-400">
                  Password must be at least 8 characters.{" "}
                </span>
              </div>
            </div>

            <div className="flex items-center mt-4">
              <button
                type="submit"
                disabled={!canSubmit}
                className="w-full text-white bg-purple-700 hover:bg-purple-600 focus:ring-1 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-3 text-center mt-2 disabled:bg-gradient-to-br disabled:from-gray-100 disabled:to-gray-300 disabled:text-gray-400 disabled:cursor-not-allowed group-invalid:bg-gradient-to-br group-invalid:from-gray-100 group-invalid:to-gray-300 group-invalid:text-gray-400 group-invalid:pointer-events-none group-invalid:opacity-70"
              >
                Create account
              </button>
            </div>
          </form>

          <div className="mt-4 text-zinc-600 text-md dark:text-zinc-300">
            Already have an account?{" "}
            <span>
              <a
                className="text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-100 hover:underline"
                href="#"
              >
                Login instead
              </a>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
