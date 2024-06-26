import React, { useContext, useEffect, useState } from "react";
import HomePosts from "../components/HomePosts";
import { URL } from "../url";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import Loader from '../components/Loader'
import { UserContext } from "../context/UserContext";

const Home = () => {
  // set in navbar {search}
  const { search } = useLocation();
  const [posts, setPosts] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const [loader,setLoader] = useState(false)
  const {user}= useContext(UserContext)
  
  const fetchPost = async () => {
    setLoader(true)
    try {
      const res = await axios.get(URL + "/api/post/" + search);
      // console.log(res);
      if (res.data.length == 0) {
        setNoResults(true);
      }
      else{
        setNoResults(false);
      }
      setLoader(false)
      setPosts(res.data);
    } catch (error) {
      console.log(error);
      setLoader(true)
    }
  };

  useEffect(() => {
    fetchPost();
  }, [search]);

  return (
    <div className="px-8 md:px-[200px] min-h-[80vh] ">
      {loader?<div className="h-[40vh] flex justify-center items-center"><Loader/></div>:!noResults ? (
        posts.map((post) =>
        <Link to={user?`/posts/post/${post._id}`:'/login'}>
          <HomePosts key={post._id} post={post} />
         </Link>
         )
      ) : 
        <h3 className="text-center font-bold mt-20 text-2xl text-white">
          No Post Available
        </h3>
      }
    </div>
  );
};

export default Home;
