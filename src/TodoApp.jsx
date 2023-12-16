
import React, {useState,useEffect} from 'react';
import './App.css'

const TodoApp = () => {
  // it store the todo array in local storage that we can use that even after refreshing 
  const initialTodos = JSON.parse(localStorage.getItem('todos')) || [];

  // declaring all states
  const [todos, setTodos] = useState(initialTodos);
  const [newTodo,setNewTodo] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [editText, setEditText] = useState('');

  useEffect(()=> {
    localStorage.setItem('todos',
    JSON.stringify(todos))
  }, [todos])

  const addTodo = () => {
    if (newTodo.trim() !== '') {
      setTodos([...todos, {text: newTodo, completed: false, category: selectedCategory }]);
      setNewTodo(''); 
    }
  };

  const editTodo = (i) => {
    const newTodos = [...todos];
    newTodos[index].text = newText;
    setTodos(newTodos);
    setEditIndex(null);
    setEditText('');
  };

  const toggleTodo = (index) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos(index).completed;
    setTodos(newTodos);
  };

  const deleteTodo =(index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  }

  
  
  
  
  
  
  
  
  
  
  
  // return (
  //   <>
  //   "hai"
  //   </>
  // )
}

export default TodoApp
