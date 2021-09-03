import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import React, { useState } from "react";
import db from "./firebaseConfig";

const ToDoList = ({ list, handleEdit }) => {
  const [checked, setChecked] = useState(false);

  const handleDelete = (id) => {
    if (window.confirm("are you sure?")) {
      db.collection("todos").doc(id).delete();
    }
  };

  return (
    <ListItem button onClick={() => setChecked(!checked)}>
      <ListItemIcon>
        <Checkbox edge="start" checked={checked === true} disableRipple />
      </ListItemIcon>
      <ListItemText
        style={{
          textDecoration: `${checked ? "line-through" : "none"}`,
        }}
        primary={list.todo}
      />
      <ListItemSecondaryAction>
        <IconButton
          onClick={() => handleEdit(list)}
          edge="end"
          aria-label="comments"
        >
          <EditIcon />
        </IconButton>

        <IconButton
          onClick={() => handleDelete(list.id)}
          edge="end"
          aria-label="comments"
        >
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default ToDoList;
