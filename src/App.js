import React, { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/header/header.component";
import Post from "./components/post/post.component";
import { db } from "./firebase/firebase.utils";

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    db.collection("posts").onSnapshot((snapshot) => {
      setPosts(snapshot.docs.map((doc) => ({ id: doc.id, post: doc.data() })));
    });
  }, []);

  return (
    <div className="App">
      <Header />
      <div>
        {posts.map(({ id, post }) => (
          <Post
            key={id}
            username={post.username}
            imageUrl={post.imageUrl}
            caption={post.caption}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
