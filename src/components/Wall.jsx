import React, { useState, useEffect } from "react";
import { db } from "../lib/firebase.config";
import { onSnapshot, collection, query, orderBy } from "firebase/firestore";
import { Link } from "react-router-dom";

const Wall = () => {
  const [posts, setPosts] = useState([]);
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
      });

      return unsubPost;
    }
  }, [db]);
  return (
    <div>
      <div className="w-full bg-white/50 gap-2 py-4 flex flex-col items-center justify-center">
        <h3 className="text-2xl font-cubano">The Wall</h3>
        <p>Here's is where the posts are:</p>
      </div>
      {posts && posts.length != 0 ? (
        <div className="grid py-6 grid-cols-1 gap-4 md:gap-3 -z-40 sm:grid-cols-2 md:grid-cols-3 max-w-[90vw] md:max-w-[950px] mx-auto">
          {posts.map((post) => (
            <Link
              to={`/wall/${post.slug}`}
              className="card hover:bg-slate-800 border-4 
            border-slate-800 backdrop-blur-xl z-10 bg-slate-50/10 
            transition hover:text-slate-50 px-4 py-4 min-h-[200px] relative"
              key={post.id}
            >
              <h2 className="font-cubano text-2xl">{post.title}</h2>
              <div className="py-3 px-4 truncate">
                <p className="truncate w-full">{post.body}</p>
              </div>
              <div
                className={`absolute bottom-2 right-3 ${
                  post.author === "admin"
                    ? "bg-emerald-800 text-white rounded-2xl"
                    : "badge"
                } badge-md`}
              >
                {post.author}
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p>No Posts Available</p>
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
