import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <HeroSection />
    </div>
  );
};

const HeroSection = () => {
  return (
    <div className="hero min-h-[80vh]">
      <div className="hero-content text-center">
        <div className="max-w-xl">
          <h1 className="text-6xl font-cubano font-black">
            Got Something Bothering you?
          </h1>

          <div className="flex gap-2 flex-col py-4">
            <p className="text-xl font-bold text-slate-700">
              Mental pain is less dramatic than physical pain, but it is more
              common and also more hard to bear. The frequent attempt to conceal
              mental pain increases the burden. Don't kill yourself.
            </p>
            <span className="text-sm text-slate-900">
              Share your problem with the world, Anonymously.
            </span>
          </div>
          <div className="flex items-center justify-center gap-3 flex-col md:flex-row">
            <Link
              to="/create-post"
              className="btn bg-slate-900 hover:bg-slate-800 hover:border-slate-800 border-4 border-slate-900  flex-1 w-full"
            >
              <button>Share It</button>
            </Link>
            <Link
              to="/wall"
              className="btn btn-ghost bg-none font-bold border-4 border-slate-900  flex-1 w-full"
            >
              <button>View Posts</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
