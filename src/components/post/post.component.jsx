import React, { useEffect, useState } from "react";
import "./post.styles.scss";
import { Avatar, Button } from "@material-ui/core";
import firebase from "firebase";
import { db } from "../../firebase/firebase.utils";
import moment from "moment";

function Post({ postId, username, caption, imageUrl }) {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  useEffect(() => {
    let unsubscribe;
    if (postId) {
      unsubscribe = db
        .collection("posts")
        .doc(postId)
        .collection("comments")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          setComments(snapshot.docs.map((doc) => doc.data()));
        });
    }
    return () => {
      unsubscribe();
    };
  }, [postId]);

  const handleComment = (event) => {
    event.preventDefault();
    db.collection("posts").doc(postId).collection("comments").add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      text: comment,
    });
    setComment("");
  };

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
        <div className="post__comments">
          {comments.map((comment) => (
            <p className="post__comments--item">
              <strong>{comment.username}</strong>
              {comment.text}
              <em className="comment__time">
                {moment(new Date(comment.timestamp.seconds * 1000)).fromNow()}
              </em>
            </p>
          ))}
        </div>
        <form className="post__comment">
          <input
            type="text"
            className="post__input"
            placeholder="Add a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <Button
            className="post__button"
            color="primary"
            disabled={!comment}
            onClick={handleComment}
          >
            Post
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Post;
