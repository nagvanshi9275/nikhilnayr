


import React from "react";

import { motion } from "framer-motion";

import { initializeApp } from "firebase/app";

import {
  getAuth,
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

import TextField from "@mui/material/TextField";

import Button from "@mui/material/Button";

import PrivacyTipIcon from "@mui/icons-material/PrivacyTip";

import GoogleIcon from "@mui/icons-material/Google";

import TodoApp from "./Main6";

import "./styles.css";

export default function Main() {
  const [email1, setemail] = React.useState("");

  const [password1, setpassword] = React.useState("");

  const [text, settext] = React.useState("");

  const [vision, setvision] = React.useState(true);

  const [hero, sethero] = React.useState(false);

  const [tashvir, settashvir] = React.useState("");

  const [user, setuser] = React.useState(null);

  const [imageElement, setimageElement] = React.useState();

  function Email(e) {
    setemail(e.target.value);
  }

  function Password(e) {
    setpassword(e.target.value);
  }

  function Click() {
    const email = email1;

    const password = password1;

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        settext("congralatution you have logged in");

        setvision(false);

        sethero(true);
      })
      .catch((error) => {
        console.error(error.message);
      });
  }

  function Signin() {
    const email = email1;

    const password = password1;

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in

        setvision(false);

        sethero(true);

        const user = userCredential.user;

        Rohit(user);
      })
      .catch((error) => {
        console.error(error.message);
      });
  }

  const firebaseConfig = {
    apiKey: "AIzaSyAgYqRop5jliG_p_BlcU1I1SduP2sStXPI",
    authDomain: "moody-5dc2e.firebaseapp.com",
    projectId: "moody-5dc2e",
    storageBucket: "moody-5dc2e.appspot.com",
    messagingSenderId: "835249398929",
    appId: "1:835249398929:web:c99bbdd5599357caee8b30",
  };

  const app = initializeApp(firebaseConfig);

  const auth = getAuth(app);

  const provider = new GoogleAuthProvider();

  function Atal() {
    //const auth = getAuth();
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        setvision(true);

        sethero(false);
      })
      .catch((error) => {
        console.error(error.message);
      });
  }

  function Pichai() {
    //const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.

        setvision(false);

        sethero(true);

        const currentuser = result.user;

        setuser(currentuser);

        Rohit(result.user);

        // The signed-in user info.

        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        // Handle Errors here.

        console.error(error.message);
      });
  }

  function Rohit(user) {
    const photoURL = user.photoURL;

    if (photoURL) {
      setimageElement(photoURL);
    } else {
      setimageElement("https://i.postimg.cc/85x8LhhW/flowers-276014-640.jpg");
    }
  }

  // onAuthStateChanged(auth, (user) => {
  // if (user) {
  // setvision(false);

  // sethero(true);
  // ...
  // } else {
  // setvision(true);

  // sethero(false);
  // }
  // });

  return (
    <>
      {vision && (
        <div>
          <div className="zebra">
            <PrivacyTipIcon className="lock" />

            <TextField
              className="alw"
              variant="outlined"
              label="Email"
              type="email"
              style={{ marginTop: "40px", height: "50px", width: "60vw" }}
              onChange={Email}
            />

            <TextField
              className="alw1"
              variant="filled"
              label="Password"
              type="password"
              style={{ marginTop: "20px", height: "50px", width: "60vw" }}
              onChange={Password}
            />
          </div>

          <div className="dunza">
            <Button
              variant="contained"
              color="success"
              onClick={Click}
              style={{ height: "40px", width: "50%", marginTop: "20px" }}
            >
              create account
            </Button>

            <Button
              variant="contained"
              color="error"
              onClick={Signin}
              style={{ height: "40px", width: "50%", marginTop: "20px" }}
            >
              Sign in
            </Button>
          </div>

          <div onClick={Pichai} className="sunder">
            <GoogleIcon />
          </div>
        </div>
      )}

      {hero && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 3 }}
        >
          <TodoApp imageElement={imageElement} handler={Atal} user={user} />
        </motion.div>
      )}
    </>
  );
}







