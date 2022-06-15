import { useState } from "react";
import axios from "axios";

export default (initialTodos) => {
  const [todoList, setTodoList] = useState(initialTodos);
  const URL = "https://todoreactmongo.herokuapp.com"

  return {
    todoList,
    setTodoList,
    createNewTodo: (newName, newTodo) => {
      const newTodoObject = {
        name: newName,
        task: newTodo,
        complete: false,
      };
      axios
        .post(`${URL}/todos/add`, newTodoObject)
        .then((res) => {
          newTodoObject._id = res.data._id;
          setTodoList([...todoList, newTodoObject]);
        });
    },

    removeTodo: (id) => {
      console.log(id);
      axios.delete(`${URL}/todos/delete/${id}`);
      const newList = todoList.filter((todo) => todo._id !== id);
      setTodoList(newList);
    },

    editTodo: (id, name, task) => {
      const editTodoObject = {
        _id: id,
        name: name,
        task: task,
      };
      setTodoList(
        todoList.map((todo) => (todo._id === id ? editTodoObject : todo))
      );
      axios.post(
        `${URL}/todos/update/${id}?name=${name}&task=${task}`
      );
    },

    toggleComplete: (id, name, task, complete) => {
      const newList = todoList.map((todo) =>
        todo._id === id ? { ...todo, complete: !todo.complete } : todo
      );
      setTodoList(newList);
      axios.post(
        `${URL}/todos/update/${id}?name=${name}&task=${task}&complete=${!complete}`
      );
    },
  };
};
