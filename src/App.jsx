import { useState, useEffect } from 'react'
import './App.css'
import { TodoForm } from './components/TodoForm'
import { TodoItem } from './components/TodoItem'

function App() {
  const [todos, setTodos] = useState(() => {
    // Check local storage for existing data
    const savedTodos = localStorage.getItem('todos');

    // If found, parse it; otherwise, start with an empty array
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      document.body.classList.add('bg-gray-900', 'text-white');
      document.body.classList.remove('bg-gray-100', 'text-gray-900');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.add('bg-gray-100', 'text-gray-900');
      document.body.classList.remove('bg-gray-900', 'text-white');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const addTodo = (text) => {
    setTodos([...todos, { id: Date.now(), text, completed: false }])
  }

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }
  const editTodo = (id, newText) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, text: newText } : todo
    ))
  }

  const totalCount = todos.length
  const completedCount = todos.filter(t => t.completed).length
  const pendingCount = totalCount - completedCount

  return (
    <>
      <title>To-Do-list</title>
      <div className="min-h-screen transition-colors duration-300 max-w-2xl mx-auto p-4 pb-2 shadow-lg/50 rounded-lg">
        <div className="flex justify-between items-center mb-6">
          <h4 className="text-2xl font-bold ">Daily To-Do List</h4>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors text-gray-800 dark:text-white font-medium"
            aria-label="Toggle dark mode"
          >
            {darkMode ? '☀︎ Light' : '☾⋆ Dark'}
          </button>
        </div>

        {/* Stats Section - Displays task counts */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div
            className="dark:bg-blue-900/20 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-blue-900/50 flex flex-col items-center justify-center transition-all hover:shadow-md"
            style={{ backgroundColor: darkMode ? undefined : 'white' }}
          >
            <p className="text-sm font-semibold text-gray-500 dark:text-blue-300 uppercase tracking-wider text-[10px] mb-1">Total</p>
            <p className="text-3xl font-extrabold text-blue-600 dark:text-blue-400">{totalCount}</p>
          </div>
          <div
            className="dark:bg-green-900/20 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-green-900/50 flex flex-col items-center justify-center transition-all hover:shadow-md"
            style={{ backgroundColor: darkMode ? undefined : 'white' }}
          >
            <p className="text-sm font-semibold text-gray-500 dark:text-green-300 uppercase tracking-wider text-[10px] mb-1">Done</p>
            <p className="text-3xl font-extrabold text-green-600 dark:text-green-400">{completedCount}</p>
          </div>
          <div
            className="dark:bg-orange-900/20 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-orange-900/50 flex flex-col items-center justify-center transition-all hover:shadow-md"
            style={{ backgroundColor: darkMode ? undefined : 'white' }}
          >
            <p className="text-sm font-semibold text-gray-500 dark:text-orange-300 uppercase tracking-wider text-[10px] mb-1">Pending</p>
            <p className="text-3xl font-extrabold text-orange-500 dark:text-orange-400">{pendingCount}</p>
          </div>
        </div>

        <TodoForm addTodo={addTodo} />
        <div className="space-y-2">
          {todos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              toggleTodo={toggleTodo}
              deleteTodo={deleteTodo}
              editTodo={editTodo}
            />
          ))}
          {todos.length === 0 && (
            <p className="text-center text-gray-500 mt-8">No tasks yet. Add one above!</p>
          )}
        </div>
      </div>
    </>
  );
}

export default App
