import React, { useEffect, useState, useRef } from "react";
import { db } from "../lib/firebase.config";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import slugify from "react-slugify";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const formRef = useRef();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    author: "anonymous",
    body: "",
    slug: "",
    createdAt: serverTimestamp(),
  });
  const [posting, setPosting] = useState(false);
  const postRef = collection(db, "posts");
  const handleSubmit = (e) => {
    setPosting(true);
    e.preventDefault();
    addDoc(postRef, form)
      .then(() => {
        toast.success("Post created successfully");
        navigate(`/wall/${form.slug}`);
        setForm({
          title: "",
          author: "anonymous",
          body: "",
          slug: "",
          createdAt: serverTimestamp(),
        });
        setPosting(false);
      })
      .catch((err) => {
        toast.error(err);
        setPosting(false);
      });
    
  };

  const { title, author, body, slug } = form;

  return (
    <div className="max-w-[800px] mx-auto pb-6">
      <div className="w-full max-w-[90vw] mx-auto rounded bg-slate-800 text-white flex items-center justify-center py-6 mb-4">
        <h2 className="font-cubano sm:text-2xl">Make a Post</h2>
      </div>
      <form
        onSubmit={handleSubmit}
        ref={formRef}
        className="w-full flex flex-col gap-3 bg-white p-8 rounded-md max-w-[90vw] md:max-w-[700px] mx-auto"
      >
        <div className="form-control">
          <label htmlFor="title">Post Title</label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) =>
              setForm({
                ...form,
                title: e.target.value,
                slug: slugify(e.target.value),
              })
            }
            name="title"
            id="title"
          />
        </div>
        <div className="form-control">
          <label htmlFor="author">Author</label>
          <input
            type="text"
            required
            placeholder="Leave Empty if anonymous"
            value={author}
            name="author"
            id="author"
            onChange={(e) =>
              setForm({
                ...form,
                author: e.target.value || "Anonymous",
              })
            }
          />
        </div>
        <div className="form-control">
          <label htmlFor="body">Post Body</label>
          <textarea
            value={body}
            required
            onChange={(e) =>
              setForm({
                ...form,
                body: e.target.value,
              })
            }
            name="body"
            id="body"
          ></textarea>
        </div>
        <div className="form-control">
          <label htmlFor="slug">
            Slug{" "}
            <i className="text-sm font-mono font-bold italic">
              (auto-generated)
            </i>
          </label>
          <input
            type="text"
            name="slug"
            required
            id="slug"
            readOnly
            value={slug}
          />
        </div>
        <button
          type="submit"
          className="bg-slate-800 hover:bg-slate-900 transition py-3 rounded text-white mt-4 flex gap-2 items-center justify-center cursor-pointer"
        >
          {!posting ? (
            "Make a Post"
          ) : (
            <>
              <div className="animate-spin w-5 h-5 rounded-full border-2 border-slate-900 border-t-white"></div>
              <span>Posting</span>
            </>
          )}
        </button>
        {/* {JSON.stringify(form)} */}
      </form>
    </div>
  );
};

export default Create;
