import React, { useState } from "react";
import "./upload-post.styles.scss";
import {
  Button,
  FormControl,
  Input,
  makeStyles,
  Modal,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import AddIcon from "@material-ui/icons/Add";
import firebase from "firebase";
import { storage, db } from "../../firebase/firebase.utils";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    outline: 0,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 4),
    borderRadius: 5,
  },
  modalLogo: {
    margin: "15px auto",
    display: "block",
  },
  modalbuttons: {
    marginTop: 30,
    display: "flex",
    justifyContent: "center",
    gap: "20px",
  },
  inputFields: {
    width: 300,
    display: "flex",
    margin: "0 auto",
  },
}));

function UploadPost({ username }) {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    if (event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };

  const handleUpload = (event) => {
    event.preventDefault();
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // progress function
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        // Error function
        alert(error.message);
        console.log(error);
      },
      () => {
        // complete function
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            // post image inside db
            db.collection("posts").add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              caption: caption,
              imageUrl: url,
              username: username,
            });
            setProgress(0);
            setCaption("");
            setImage(null);
            handleClose();
          });
      }
    );
  };

  return (
    <>
      <Button onClick={handleOpen}>Upload</Button>
      <Modal open={open} onClose={handleClose}>
        <div style={modalStyle} className={classes.paper}>
          <form>
            <FormControl className={classes.inputFields}>
              <Input type="file" onChange={handleChange} />
              <progress value={progress} max="100" />
              <Input
                type="text"
                placeholder="Enter a caption..."
                onChange={(e) => setCaption(e.target.value)}
              />
            </FormControl>
            <div className={classes.modalbuttons}>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleClose}
              >
                <CloseIcon />
                Cancel
              </Button>

              <Button
                type="submit"
                variant="contained"
                color="primary"
                onClick={handleUpload}
              >
                <AddIcon />
                Upload
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}

export default UploadPost;
