import React, { useState, useEffect } from "react";
import { db } from "../lib/firebase.config";
import {
  onSnapshot,
  collection,
  query,
  orderBy,
  limit,
  startAfter,
} from "firebase/firestore";
import { Link } from "react-router-dom";
import { GoUnverified } from "react-icons/go";
import { MdVerified } from "react-icons/md";
import { RiEmotionSadLine } from "react-icons/ri";
import { BsVectorPen } from "react-icons/bs";

const Wall = () => {
  const [posts, setPosts] = useState([]);
  const [latestPost, setLatestPost] = useState(null);
  useEffect(() => {
    if (db) {
      const postRef = collection(db, "posts");
      const postQuery = query(postRef, orderBy("createdAt", "desc"));
      const unsubPost = onSnapshot(postQuery, (snapshot) => {
        const _data = snapshot.docs.map((doc) => {
          return {
            ...doc.data(),
            id: doc.id,
          };
        });
        setPosts(_data);
        // setLatestPost(snapshot.docs[snapshot.docs.length - 1]);
      });

      return unsubPost;
    }
  }, [db]);
  return (
    <div>
      <div className="w-full bg-white/50 gap-2 py-4 flex flex-col items-center justify-center">
        <h3 className="text-2xl font-cubano">The Wall</h3>
        <p>Here's where the posts are:</p>
      </div>
      {posts && posts.length != 0 ? (
        <div className="grid py-6 grid-cols-1 gap-4 md:gap-3 -z-40 sm:grid-cols-2 md:grid-cols-3 max-w-[90vw] md:max-w-[950px] mx-auto">
          {posts.map((post) => (
            <Link
              to={`/wall/${post.slug}`}
              className="card transform-cpu hover:bg-slate-800 shadow-2xl border-4 
            border-slate-800 rotate-0 md:rotate-1 hover:rotate-0 backdrop-blur-xl z-10 bg-slate-50/10 
            transition duration-300 hover:text-slate-50 px-4 py-4 min-h-[200px] relative"
              key={post.id}
            >
              <h2 className="font-cubano text-2xl line-clamp-2">
                {post.title}
              </h2>
              <div className="py-3 px-4 capitalize">
                <p className="line-clamp-2 capitalize w-full">{post.body}</p>
              </div>
              <div
                className={`absolute bottom-2 right-3 ${
                  post.author === "admin"
                    ? "bg-emerald-600 text-white rounded-2xl"
                    : "badge"
                } badge-md flex gap-1 items-center justify-center py-3 px-3`}
              >
                {post.author}
                {post.author === "admin" ? <MdVerified /> : <GoUnverified />}
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="min-h-[300px] mx-auto border flex items-center justify-center gap-3 flex-col">
          <RiEmotionSadLine className="text-6xl" />
          <h3 className="text-xl font-cubano">No posts yet</h3>
          <Link to="/create-post" className="bg-slate-700 text-white flex gap-2 items-center justify-center py-3 px-4 hover:bg-slate-800 transition rounded capitalize">
            <BsVectorPen className="text-2xl" /> Create Post
          </Link>
        </div>
      )}
    </div>
  );
};

const PostSection = (posts) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 max-w-[950px] mx-auto">
      {posts.map((post) => (
        <div key={post.id}>{post.title}</div>
      ))}
    </div>
  );
};

export default Wall;
