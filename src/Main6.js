

import React, { useState } from "react";

import PropTypes from "prop-types";

import { initializeApp } from "firebase/app";

import { getFirestore, collection, addDoc } from "firebase/firestore";

import "./styles.css";

import {
  Button,
  TextField,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import LogoutIcon from "@mui/icons-material/Logout";

const TodoApp = (props) => {
  //add the new

  const user = props.user;

  const firebaseConfig = {
    apiKey: "AIzaSyAgYqRop5jliG_p_BlcU1I1SduP2sStXPI",
    authDomain: "moody-5dc2e.firebaseapp.com",
    projectId: "moody-5dc2e",
    storageBucket: "moody-5dc2e.appspot.com",
    messagingSenderId: "835249398929",
    appId: "1:835249398929:web:c99bbdd5599357caee8b30",
  };

  const app = initializeApp(firebaseConfig);

  const db = getFirestore(app);

  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  const handleAddTask = () => {
    if (task.trim() !== "") {
      setTasks([...tasks, task]);
      setTask("");
    }

    //new adding task

    const firestoreCollection = collection(db, "PrototypeData");

    // Data to be added to Firestore
    const dataToAdd = {
      Name: task,
      UserId: user.uid,

      // Add other key-value pairs as needed
    };

    // Use addDoc to add the data to Firestore
    addDoc(firestoreCollection, dataToAdd)
      .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  const handleRemoveTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <img className="rema" src={props.imageElement} />

      <h3>अन्तः अस्ति प्रारंभः</h3>

      <h1>Todo App</h1>

      <LogoutIcon onClick={props.handler} style={{ cursor: "pointer" }} />

      <TextField
        label="New Task"
        variant="outlined"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        style={{ marginRight: "10px" }}
      />
      <Button variant="contained" color="primary" onClick={handleAddTask}>
        Add Task
      </Button>
      <List style={{ marginTop: "20px" }}>
        {tasks.map((task, index) => (
          <ListItem key={index}>
            <ListItemText primary={task} />
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => handleRemoveTask(index)}
              >
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

// jai shree ram

// to

// everyone

export default TodoApp;

TodoApp.propTypes = {
  imageElement: PropTypes.string.isRequired,
  handler: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
};







