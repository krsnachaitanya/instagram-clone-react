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
    width: 500,
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

function UploadPost() {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Button onClick={handleOpen}>Upload</Button>
      <Modal open={open} onClose={handleClose}>
        <div style={modalStyle} className={classes.paper}>
          <form>
            <FormControl className={classes.inputFields}></FormControl>

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
                onClick={handleClose}
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
