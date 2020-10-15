import React, { useState } from "react";
import "./upload-post.styles.scss";
import {
  Box,
  Button,
  FormControl,
  makeStyles,
  Modal,
  TextField,
  Typography,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import AddIcon from "@material-ui/icons/Add";
import LinearProgress from "@material-ui/core/LinearProgress";
import firebase from "firebase";
import { storage, db } from "../../firebase/firebase.utils";

function LinearProgressWithLabel(props) {
  return (
    <Box display="flex" alignItems="center" marginTop="10px">
      <Box minWidth={70}>
        <Typography variant="body2">Progress:</Typography>
      </Box>
      <Box width="100%" mr="10px">
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box minWidth={35}>
        <Typography
          variant="body2"
          color="textSecondary"
        >{`${props.value}%`}</Typography>
      </Box>
    </Box>
  );
}

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
    padding: theme.spacing(4, 4, 4),
    borderRadius: 5,
  },
  modalLogo: {
    margin: "15px auto",
    display: "block",
  },
  modalbuttons: {
    marginTop: 15,
    display: "flex",
    justifyContent: "center",
    gap: "20px",
  },
  inputFields: {
    width: 300,
    display: "flex",
    gap: "20px",
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
              <TextField
                type="file"
                variant="outlined"
                accept="image/*"
                onChange={handleChange}
              />
              <TextField
                label="Enter a caption"
                variant="outlined"
                onChange={(e) => setCaption(e.target.value)}
              />
              <LinearProgressWithLabel value={progress} />
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
                disabled={!caption || !image}
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
