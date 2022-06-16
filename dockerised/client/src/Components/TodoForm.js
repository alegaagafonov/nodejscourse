import React from "react";
import useInputState from "../Hooks/useInputState";
import { makeStyles, Paper, Button } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
// import axios from "axios";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  buttonSpacing: {
    width: "50%",
  },
}));

const TodoForm = React.memo(({ createNewTodo }) => {
  const classes = useStyles();

  const [name, setName, resetName] = useInputState("");
  const [todo, setTodo, resetTodo] = useInputState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    createNewTodo(name, todo);
    handleReset();
  };

  const handleReset = () => {
    resetName();
    resetTodo();
  };

  return (
    <Paper>
      <form className={classes.form} onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          id="Name"
          label="Name"
          name="Name"
          value={name}
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
          value={todo}
          onChange={setTodo}
        />
        <Button
          variant="contained"
          color="primary"
          className={classes.buttonSpacing}
          type="submit"
        >
          Submit
        </Button>
        <Button
          variant="contained"
          color="secondary"
          className={classes.buttonSpacing}
          onClick={handleReset}
        >
          Reset
        </Button>
      </form>
    </Paper>
  );
})



export default TodoForm;