import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PostDetails from "./pages/PostDetails";
import CreatePost from "./pages/CreatePost";
import EditPost from "./pages/EditPost";
import { UserContextProvider } from "./context/UserContext";
import PageNotFound from "./pages/PageNotFound";

const App = () => {
  return (
    <>
    <UserContextProvider>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/posts/post/:id" element={<PostDetails />} />
        <Route exact path="/create" element={<CreatePost />} />
        <Route exact path="/edit/:id" element={<EditPost />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
      </UserContextProvider>
    </>
  );
};

export default App;
