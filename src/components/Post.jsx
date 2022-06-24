import React, { useState, useEffect } from "react";
import { db } from "../lib/firebase.config";
import { onSnapshot, collection, query, orderBy } from "firebase/firestore";
import ReactMarkdown from "react-markdown";

const Post = ({ slug }) => {
  const [postArr, setPostArr] = useState([]);

  useEffect(() => {
    if (db) {
      const postRef = collection(db, "posts");

      onSnapshot(postRef, (snapshot) => {
        const _data = snapshot.docs.map((doc) => {
          return {
            ...doc.data(),
            id: doc.id,
          };
        });
        setPostArr(_data);
      });
    }
  }, []);

  if (postArr.length === 0) {
    return (
      <div
        className="w-full min-h-[500px] flex items-center justify-center flex-col"
      >
        <div className="w-16 h-16 rounded-full border-4 border-white border-t-slate-800 animate-spin"></div>
      </div>
    );
  }

  return (
    <div>
      {postArr.map((post) =>
        post.slug === slug ? (
          <>
            <div
              key={post.id}
              className="max-w-[90vw] md:max-w-[750px] lg:max-w-[850px] mx-auto"
            >
              <h1 className="text-center text-xl sm:text-2xl py-3 pb-5 md:text-3xl lg:text-5xl font-cubano font-black">
                {post.title}
              </h1>
              <div className="prose prose-md break-all lg:prose-xl w-full max-w-[90vw] md:max-w-[960px]">
                <ReactMarkdown>{post.body}</ReactMarkdown>
              </div>
            </div>
          </>
        ) : null
      )}
    </div>
  );
};

export default Post;
