import React from "react";
import "./post.styles.scss";
import { Avatar } from "@material-ui/core";

function Post({ username, caption, imageUrl }) {
  return (
    <div className="post__container">
      <div className="post__header">
        <Avatar
          className="post__avatar"
          alt={username}
          src="/static.images/avatar/1.jpg"
        />
        <h3>{username}</h3>
      </div>
      <img className="post__image" src={imageUrl} alt="" />
      <div className="post__footer">
        <p className="post__text">
          <strong>{username}</strong>
          <span>{caption}</span>
        </p>
      </div>
    </div>
  );
}

export default Post;
