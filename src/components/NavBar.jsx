import React, { useState } from "react";
import { Link } from "react-router-dom";
import { HiMenu } from "react-icons/hi";
import { MdOutlineClose } from "react-icons/md";
import { BiPen } from "react-icons/bi";

const NavBar = () => {
  const [menu, setMenu] = useState(false);

  return (
    <>
      <nav className="w-full bg-white fixed top-0 z-40 shadow-md backdrop-blur-md">
        <div className="flex items-center justify-between w-full relative py-4 px-4 md:px-8 max-w-7xl mx-auto">
          <div className="logo">
            <Link
              className="navbar-item font-cubano font-black uppercase text-2xl"
              to="/home"
            >
              ShareIt
            </Link>
          </div>
          <div className=" gap-5 hidden md:flex items-center justify-center font-semibold text-lg">
            <Link to="/home">
              <p>Home</p>
            </Link>
            <Link to="/wall">
              <p>Wall</p>
            </Link>
          </div>
          <div className="sign-btn items-center justify-between gap-3 hidden md:flex">
            <Link to={"/create-post"}>
              <button className="btn flex items-center justify-center gap-1 bg-slate-900 hover:bg-slate-800">
                <BiPen className="text-2xl" />
                <span>Create Post</span>
              </button>
            </Link>
          </div>
          <div className="navbar-end flex md:hidden">
            <button
              onClick={() => setMenu(!menu)}
              className="bg-slate-800 py-3 text-xl px-3 text-white rounded-xl"
            >
              {menu ? <MdOutlineClose /> : <HiMenu />}
            </button>
          </div>
        </div>
      </nav>
      {menu && (
        <div className="fixed z-40 top-0 left-0 h-screen w-screen flex items-center justify-center bg-slate-900">
          <button
            onClick={() => setMenu(false)}
            className="bg-white fixed top-3 right-3 py-2 px-2 rounded-full"
          >
            <MdOutlineClose className="text-2xl" />
          </button>
          <div className="flex z-40 flex-col items-center shadow-lg justify-center w-[300px] bg-slate-100 sm:w-[400px] rounded py-6 px-4 gap-3">
            <Link
              className="flex-1 text-center py-2 hover:bg-slate-200 w-full"
              onClick={() => setMenu(false)}
              to="/home"
            >
              <p>Home</p>
            </Link>
            <Link
              className="flex-1 text-center py-2 hover:bg-slate-200 w-full"
              onClick={() => setMenu(false)}
              to="/wall"
            >
              <p>Wall</p>
            </Link>
            <Link
              className="flex-1 w-full"
              onClick={() => setMenu(false)}
              to={"/create-post"}
            >
              <button className="btn flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 w-full">
                <BiPen className="text-2xl" />
                <span>Create Post</span>
              </button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default NavBar;
