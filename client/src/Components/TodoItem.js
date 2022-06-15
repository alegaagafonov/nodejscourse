import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import useToggle from "../Hooks/useToggleState";
import useInputState from "../Hooks/useInputState";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import { Checkbox } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: "inline",
  },
}));

function TodoItem({
  _id,
  task,
  name,
  complete,
  editTodo,
  toggleComplete,
  removeTodo,
}) {
  const classes = useStyles();
  const [editing, toggleEditing] = useToggle(false);
  const [editName, setName, resetName] = useInputState(name);
  const [editTask, setTask, resetTask] = useInputState(task);

  const handleSubmit = (e) => {
    e.preventDefault();
    editTodo(_id, editName, editTask);
    resetName();
    resetTask();
    toggleEditing();
  };


  return (
    <List className={classes.root}>
      {editing ? (
        <form onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="Name"
            label="Name"
            name="Name"
            value={editName}
            onChange={setName}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="Todo"
            label="Todo"
            name="Todo"
            value={editTask}
            onChange={setTask}
          />
          <Button
            variant="contained"
            color="primary"
            className={classes.buttonSpacing}
            type="submit"
          >
            Submit
          </Button>
        </form>
      ) : (
        <>
          <ListItem alignItems="flex-start">
            <Checkbox checked={complete} onClick={() => toggleComplete(_id, name, task, complete)} />
            <ListItemText primary={name} secondary={task} />
            <IconButton onClick={() => removeTodo(_id)}>
              <DeleteIcon />
            </IconButton>
            <IconButton onClick={toggleEditing}>
              <EditIcon />
            </IconButton>
          </ListItem>
          <Divider />
        </>
      )}
    </List>
  );
}

export default TodoItem;
