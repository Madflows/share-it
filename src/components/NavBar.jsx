import React, { useState } from "react";
import { Link } from "react-router-dom";
import { HiMenu } from "react-icons/hi";
import { MdOutlineClose } from "react-icons/md";
import { BiPen } from "react-icons/bi";

const NavBar = () => {
  const [menu, setMenu] = useState(false);

  return (
    <>
      {/* <nav className="w-full bg-white fixed top-0 z-40 shadow-md backdrop-blur-md">
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
      </nav> */}
      <Nav2 menu={menu} setMenu={setMenu} />
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

function Nav2({ menu, setMenu }) {
  return (
    <header className="absolute inset-x-0 top-0 z-10 py-6 w-full bg-[#101212]">
      <div className="px-4 mx-auto sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="px-4">
            <Link to="/" title="" className="flex logo font-cubano text-3xl text-white">
              SHareIt
            </Link>
          </div>

          <div className="hidden lg:flex lg:items-center lg:justify-center lg:space-x-10">
            <Link to={"/wall"} className="text-base text-white transition-all duration-200 hover:text-opacity-80">
              <p>Wall</p>
            </Link>
            <Link to={"/home"} className="text-base text-white transition-all duration-200 hover:text-opacity-80">
              <p>Home</p>
            </Link>
          </div>

          <div className="lg:flex lg:items-center lg:justify-end lg:space-x-6 sm:ml-auto">
            <Link className="hidden text-base text-white transition-all duration-200 lg:inline-flex hover:text-opacity-80" to="/wall">View Posts</Link>

            <Link to="/create-post" title="" className="inline-flex items-center justify-center px-3 sm:px-5 py-2.5 text-sm sm:text-base font-semibold transition-all duration-200 text-white bg-white/20 hover:bg-white/40 focus:bg-white/40 rounded-lg" role="button"> Write a Post </Link>

          </div>

          <button type="button" onClick={() => setMenu(!menu)} className="inline-flex p-2 ml-1 text-white transition-all duration-200 rounded-md sm:ml-4 lg:hidden focus:bg-gray-800 hover:bg-gray-800">
            {
              (menu == false) ? (

                <svg className="block w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              ) : (

                <svg className="block w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              )
            }

          </button>
        </div>
      </div>
    </header>
  )
}

export default NavBar;
