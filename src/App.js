import React, { useState } from "react";
import "./App.css";
import Header from "./components/header/header.component";
import Post from "./components/post/post.component";

function App() {
  const [posts, setPosts] = useState([
    {
      username: "coderchaitu",
      caption: "react instagram clone",
      imageUrl:
        "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
    },
    {
      username: "coderchaitu",
      caption: "react instagram clone",
      imageUrl:
        "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
    },
    {
      username: "coderchaitu",
      caption: "react instagram clone",
      imageUrl:
        "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
    },
  ]);
  return (
    <div className="App">
      <Header />
      {posts.map((post) => (
        <Post
          username={post.username}
          imageUrl={post.imageUrl}
          caption={post.caption}
        />
      ))}
    </div>
  );
}

export default App;
