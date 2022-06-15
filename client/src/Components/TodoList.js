import React, { useEffect } from "react";
import TodoItem from "./TodoItem";
import TodoForm from "./TodoForm";
import List from "@material-ui/core/List";
import useTodoState from "../Hooks/useTodoState";
// import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import Paper from "@material-ui/core/Paper";
// import Faker from "faker";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     width: "100%",
//     maxWidth: 360,
//     backgroundColor: theme.palette.background.paper,
//   },
// }));

function TodoList() {
  // const classes = useStyles();
  const initialValues = [];

  const {
    todoList,
    setTodoList,
    createNewTodo,
    removeTodo,
    editTodo,
    toggleComplete,
  } = useTodoState(initialValues);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/`)
      .then((res) => {
        res.data.map(() => {
          setTodoList(res.data);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [setTodoList]);

  return (
    <Paper>
      {todoList.map((task) => (
        <List key={task._id}>
          <TodoItem
            {...task}
            editTodo={editTodo}
            toggleComplete={toggleComplete}
            removeTodo={removeTodo}
          />
        </List>
      ))}
      <TodoForm createNewTodo={createNewTodo} />
    </Paper>
  );
}

const TodoListMemo = React.memo(TodoList);

export default TodoListMemo;

// function TodoApp() {
//   const classes = useStyles();

//   return (
//     <Paper>
//       <TodoList
//         todoList={todoList}
//         className={classes.todoList}
//         createNewTodo={createNewTodo}
//         editTodo={editTodo}
//         toggleComplete={toggleComplete}
//         removeTodo={removeTodo}
//       />
//     </Paper>
//   );
// }

// export default TodoApp;
