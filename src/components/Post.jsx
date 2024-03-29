import { db } from "../lib/firebase.config";


import React, { useState, useEffect } from "react";
import {
  onSnapshot,
  collection,
  query,
  orderBy,
  addDoc,
} from "firebase/firestore";
import ReactMarkdown from "react-markdown";
import { RiEmotionSadLine } from "react-icons/ri";
import toast from "react-hot-toast";

import MDEditor from '@uiw/react-md-editor';

const Post = ({ slug }) => {
  const [postArr, setPostArr] = useState([]);
  const [comments, setComments] = useState([]);
  const [postID, setPostID] = useState("");
  const [commentMessage, setCommentMessage] = useState("")
  const [commentForm, setCommentForm] = useState({
    author: "anonymous",
    message: commentMessage,
  });

  useEffect(() => {
    setCommentForm({
      ...commentForm,
      message: commentMessage,
    })            
  }, [commentForm])

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

  useEffect(() => {
    postArr.map((post) => (post.slug === slug ? setPostID(post.id) : null));
  }, [postArr]);

  useEffect(() => {
    if (db) {
      postArr.map((post) => {
        if (post.slug === slug) {
          const commentRef = query(
            collection(db, "posts", `${post.id}`, "comments")
          );
          console.log(commentRef);
          onSnapshot(commentRef, (snapshot) => {
            const _data = snapshot.docs.map((doc) => {
              return {
                ...doc.data(),
                id: doc.id,
              };
            });
            setComments(_data);
            console.log(_data);
          });
        }
      });
    }
  }, [postArr]);

  const addComment = (e) => {
    e.preventDefault();
    console.log(postID);
    addDoc(collection(db, "posts", `${postID}`, "comments"), commentForm)
      .then(() => {
        setCommentForm({
          author: "",
          message: "",
        });
        toast.success("Comment added successfully");
      })
      .catch((err) => {
        toast.error(err);
      });
  };

  const { author, message } = commentForm;

  if (postArr.length === 0) {
    return (
      <div className="w-full min-h-[500px] flex items-center justify-center flex-col">
        <div className="w-16 h-16 rounded-full border-4 border-white border-t-slate-800 animate-spin"></div>
      </div>
    );
  }

  return (
    <div>
      {postArr.map((post) =>
        post.slug === slug ? (
          <div key={post.id} className="pb-8">
            <div className="max-w-[90vw] text-slate-50 md:max-w-[750px] lg:max-w-[850px] mx-auto">
              <h1 className="text-center text-xl sm:text-2xl py-3 pb-5 md:text-3xl lg:text-5xl font-cubano font-black">
                {post.title}
              </h1>
              <div className="prose text-slate-50 prose-md break-all min-h-[300px] lg:prose-xl w-full max-w-[90vw] md:max-w-[960px]">
                <ReactMarkdown>{post.body}</ReactMarkdown>
              </div>


              <div className="bg-white max-w-[90vw] my-[1rem] md:max-w-[600px] mx-auto rounded-lg py-6 px-6 shadow-lg">
                <h2 className="font-cubano text-stone-900 text-lg md:text-2xl py-4">
                  Comments
                </h2>
                {comments.length != 0 ? (
                  <div className="flex flex-col gap-3 py-2">
                    {comments.map((comment) => (
                      <div
                        key={comment.id}
                        className="flex flex-col gap items-start bg-emerald-100 rounded-lg justify-start py-4 px-4 hover:bg-emerald-200 transition"
                      >
                        <h3 className="font-bold text-stone-800">
                          By <span>{comment.author}</span>
                        </h3>
                        <ReactMarkdown className="text-sm text-stone-800">
                        {comment.message}
                        </ReactMarkdown>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-4 flex flex-col gap-1 text-stone-900 items-center justify-center">
                    <RiEmotionSadLine className="text-4xl" />
                    <p className="text-lg font-bold ">No comments yet</p>
                    <p className="text-sm">Be the first to comment</p>
                  </div>
                )}
                <div className="py-4">
                  <form onSubmit={addComment} className="flex flex-col gap-2">
                    <div>
                      <label htmlFor="comment">Comment</label>
                      <MDEditor
                        name="comment"
                        id="comment"
                        className="resize-none w-full h-32 font-semibold p-2 border-2 border-gray-300 rounded-lg"
                        placeholder="Make a Comment"
                        value={commentMessage}
                        onChange={setCommentMessage}
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="author">Name</label>
                      <input
                        type="text"
                        name="author"
                        id="author"
                        placeholder="name"
                        className="font-semibold"
                        value={author}
                        onChange={(event) =>
                          setCommentForm({
                            ...commentForm,
                            author: event.target.value,
                          })
                        }
                      />
                    </div>
                    <button
                      type="submit"
                      className="btn bg-emerald-900 hover:bg-emerald-800 text-white outline-none rounded-lg mt-4"
                    >
                      Add Comment
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        ) : null
      )}
    </div>
  );
};

export default Post;
