
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
  const [categories, setCategories] = useState(['All', 'Work', 'Personal', 'Shopping']);
  const [selectedCategory,setSelectedCategories] = useState('All');
  const [showCompleted,setShowCompleted] = useState(false);

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

  const filterTodos = () => {
    let filterTodos = todos;

    if (selectedCategory !== 'All') {
      filterTodos = filterTodos.filter((todo) => todo.category === selectedCategory);
    }

    if (showCompleted) {
      filterTodos = filterTodos.filter((todo) => todo.completed);
    }

    return filterTodos;
  };
  
  //here the render part 

  return (
 <>
    <div className='App'>

    <h1>Todo App</h1>

    <div>

    <input 
   type="text"
   placeholder='Add Todo...'
   value={newTodo}
   onChange={(e) => setNewTodo(e.target.value)}
    />

    <button onClick={addTodo}>Add</button>

    </div>

    <div>
      <select value={selectedCategory} onChange={(e)=> setSelectedCategories(e.target.value)} >
        {categories.map((category) => (
          <option key={category} value={category}>{category}</option>
        ))}
      </select>
    </div>

    
    </div>
 </>
  )
}

export default TodoApp
