import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { NavBar, Home, Wall, Create, Post, Footer } from "./components";
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
    <div className="bg-blue-100 min-h-screen">
      <NavBar />
      <ScrollToTop />
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
      <Footer />
    </div>
  );
}




function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default App;
