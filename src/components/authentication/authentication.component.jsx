import React, { useEffect, useState } from "react";
import "./authentication.styles.scss";
import { Button, FormControl, Input } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { auth } from "../../firebase/firebase.utils";
import UploadPost from "../upload-post/upload-post.component";

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

function Authentication() {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const [openSignIn, setOpenSignIn] = useState(false);
  const [openSignUp, setOpenSignUp] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        console.log(authUser);
        setUser(authUser);
      } else {
        setUser(null);
      }
      return () => {
        // perform clean up actions
        unsubscribe();
      };
    });
  }, [user, username]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setUsername("");
    setEmail("");
    setPassword("");
    setOpenSignIn(false);
    setOpenSignUp(false);
  };

  const signUp = (event) => {
    event.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        return authUser.user.updateProfile({
          displayName: username,
        });
      })
      .catch((err) => alert(err.message));
    handleClose();
  };

  const signIn = (event) => {
    event.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .catch((err) => alert(err.message));
    handleClose();
  };

  return (
    <>
      {user?.displayName ? (
        <div>
          <UploadPost username={user.displayName} />
          <Button
            color="secondary"
            variant="outlined"
            onClick={() => auth.signOut()}
          >
            Logout
          </Button>
        </div>
      ) : (
        <div>
          <Button
            onClick={() => {
              handleOpen();
              setOpenSignIn(true);
            }}
          >
            Sign In
          </Button>
          <Button
            onClick={() => {
              handleOpen();
              setOpenSignUp(true);
            }}
          >
            Sign Up
          </Button>
        </div>
      )}

      <Modal open={open} onClose={handleClose}>
        <div style={modalStyle} className={classes.paper}>
          <img
            className={classes.modalLogo}
            src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
            alt="Instagram Logo"
          />
          <form>
            {openSignUp ? (
              <FormControl className={classes.inputFields}>
                <Input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />{" "}
              </FormControl>
            ) : (
              <FormControl className={classes.inputFields}>
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormControl>
            )}

            <div className={classes.modalbuttons}>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleClose}
              >
                <CloseIcon />
                Close
              </Button>
              {openSignIn ? (
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  onClick={signIn}
                >
                  Sign In
                </Button>
              ) : (
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  onClick={signUp}
                >
                  Sign Up
                </Button>
              )}
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}

export default Authentication;
