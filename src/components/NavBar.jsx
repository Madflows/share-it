import React, { useState } from "react";
import { Link } from "react-router-dom";
import { HiMenu } from "react-icons/hi";
import { MdOutlineClose } from "react-icons/md";

const NavBar = () => {
  const [menu, setMenu] = useState(false);

  return (
    <>
      <nav className="w-full bg-slate-900/20 fixed top-0 backdrop-blur-md">
        <div className="navbar relative py-4 px-4 md:px-8 max-w-7xl mx-auto">
          <div className="navbar-start">
            <Link
              className="navbar-item font-cubano font-black uppercase text-2xl"
              to="/home"
            >
              It's Time
            </Link>
          </div>
          <div className="navbar-end gap-3 hidden md:flex">
            <div className="flex gap-3 items-center justify-center font-semibold text-lg underline">
              <Link to="/home">
                <p>Home</p>
              </Link>
              <Link to="/wall">
                <p>Wall</p>
              </Link>
            </div>
            <Link to={"/create-post"}>
              <button className="btn">Make a Post</button>
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
        <div className="absolute z-40 top-[7rem] left-[50%] w-[300px] sm:w-[400px] shadow-lg -translate-x-[50%] bg-slate-100 rounded py-6 px-4">
          <div className="flex z-40 flex-col items-center justify-center w-full gap-3">
            <Link onClick={() => setMenu(false)} to="/home">
              <p>Home</p>
            </Link>
            <Link onClick={() => setMenu(false)} to="/wall">
              <p>Wall</p>
            </Link>
            <Link onClick={() => setMenu(false)} to={"/create-post"}>
              <button className="btn">Make a Post</button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default NavBar;
