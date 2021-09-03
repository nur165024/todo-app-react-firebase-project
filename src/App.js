import { Button, FormControl, Input, InputLabel } from "@material-ui/core";
import firebase from "firebase/compat/app";
import { useEffect, useState } from "react";
import "./App.css";
import db from "./firebaseConfig";
import ToDoList from "./ToDoList";

function App() {
  const [todos, setToDos] = useState([]);
  const [input, setInput] = useState("");
  const [editId, setEdit] = useState("");

  console.log(input);

  useEffect(() => {
    db.collection("todos")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setToDos(
          snapshot.docs.map((doc) => ({ id: doc.id, todo: doc.data().todo }))
        );
      });
  }, []);

  // save data
  const save = () => {
    db.collection("todos").add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setToDos([...todos, input]);
    setInput("");
  };

  // edit data
  const handleEdit = (data) => {
    setInput(data.todo);
    setEdit(data.id);
  };

  const update = () => {
    db.collection("todos").doc(editId).update({
      todo: input,
    });
    setInput("");
    setEdit("");
  };

  // clear
  const handleClearn = () => {
    setInput("");
    setEdit("");
  };

  return (
    <div className="App container">
      <h1>Nure Alam Todo list app</h1>
      <div className="formList">
        <FormControl>
          <InputLabel>Write a Todo</InputLabel>
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            id="outlined-basic"
            label="Outlined"
            variant="outlined"
          />
        </FormControl>
        {!editId ? (
          <Button
            disabled={!input}
            variant="outlined"
            color="primary"
            onClick={save}
            type="button"
            style={{ marginLeft: 10 }}
          >
            Add Todo
          </Button>
        ) : (
          <>
            <Button
              disabled={!input}
              variant="outlined"
              color="primary"
              onClick={update}
              type="button"
              style={{ marginLeft: 10 }}
            >
              Update
            </Button>
            <Button
              disabled={!input}
              variant="outlined"
              color="primary"
              onClick={handleClearn}
              type="button"
              style={{ marginLeft: 10 }}
            >
              Clear
            </Button>
          </>
        )}
      </div>

      <ul>
        {todos.map((list, index) => (
          <ToDoList list={list} handleEdit={handleEdit} index={index} />
        ))}
      </ul>
    </div>
  );
}

export default App;
