
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

  const editTodo = (index, newText) => {
    const newTodos = [...todos];
    newTodos[index].text = newText;
    setTodos(newTodos);
    setEditIndex(null);
    setEditText('');
  };

  const toggleTodo = (index) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  };

  const deleteTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
    
    // Update: Filter todos based on the selected category
    const filteredTodos = newTodos.filter(todo => {
      if (selectedCategory === 'All') {
        return true; // Return all todos if 'All' category is selected
      } else {
        return todo.category === selectedCategory;
      }
    });
  
    setTodos(filteredTodos);
  };
  

  const filterTodos = () => {
    let filterTodos = todos;

    if (selectedCategory !== 'All') {
      filterTodos = filterTodos.filter((todo) => todo.category === selectedCategory);
    }

    if (showCompleted) {
      filterTodos = filterTodos.filter((todo) => todo.completed);
    }
    console.log(filterTodos);
    return filterTodos;
    
  };

  // console.log(filterTodos);
  
  //here the render part 

  return (
    <>
      <div className="App">
        <h1>Todo App</h1>

        <div>
          <div>
            <input
              className="todo-input"
              type="text"
              placeholder="Add Todo..."
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
            />
            <button className="add-button" onClick={addTodo}>
              Add
            </button>
          </div>

          <div className="filter-section">
            <div>
              <select
                className="custom-select"
                value={selectedCategory}
                onChange={(e) => setSelectedCategories(e.target.value)}
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div className="checkbox-label">
              <label>
                <input
                  className="checkbox-input"
                  type="checkbox"
                  checked={showCompleted}
                  onChange={() => setShowCompleted(!showCompleted)}
                />
                showCompleted
              </label>
            </div>
          </div>

          {/* Todo list rendering */}
          {/* ... */}
        </div>

        {/* this ul listing the todo */}
        <ul>
          {/* {console.log(filterTodos)} */}

          {filterTodos().map((todo, index) => (
            <li key={index}>
              {editIndex === index ? (
                <>
                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                  />
                  <button onClick={() => editTodo(index, editText)}>
                    Save
                  </button>
                </>
              ) : (
                <>
                  <span
                    className={`todo-text ${todo.completed ? "completed" : ""}`}
                    onClick={() => {
                      if (!todo.completed) {
                        setEditIndex(index);
                        setEditText(todo.text);
                      }
                    }}
                  >
                    {todo.text}
                  </span>
                  <div>
                    {/* complete button */}
                    <button
                      className={`complete-btn ${
                        todo.completed ? "completed" : ""
                      }`}
                      onClick={() => toggleTodo(index)}
                    >
                      {todo.completed ? "Undo" : "Complete"}
                    </button>

                    {/* delete button */}
                    <button
                      className="delete-btn"
                      onClick={() => deleteTodo(index)}
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default TodoApp
