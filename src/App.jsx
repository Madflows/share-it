import { Routes, Route, Navigate } from "react-router-dom";
import { NavBar, Home, Wall, Create, Post } from "./components";
import { useState, useEffect } from "react";
import { db } from "./lib/firebase.config";
import { onSnapshot, collection, query, orderBy } from "firebase/firestore";


function App() {
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
    <div className="bg-mesh min-h-screen">
      <NavBar />
      <div className="pt-[6rem] z-0">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Navigate to="/" />} />
          <Route path="/wall" element={<Wall />} />
          <Route path="/create-post" element={<Create />} />
          {posts.map((post) => (
            <Route
              path={`/wall/${post.slug}`}
              key={post.id}
              element={<Post slug={`${post.slug}`} />}
            />
          ))}
        </Routes>
      </div>
    </div>
  );
}

export default App;
