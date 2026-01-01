import { useState } from 'react';

export function TodoForm({ addTodo }) {
    const [text, setText] = useState('');

    const handleSubmit = () => {
        if (!text.trim()) return;
        addTodo(text);
        setText('');
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSubmit();
        }
    };

    return (
        <div className="flex gap-2 mb-6">
            <input
                type="text"
                value={text}
                onChange={(event) => setText(event.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Add a new task..."
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 bg-white "
            />
            <button
                onClick={handleSubmit}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
                Add Task
            </button>
        </div>
    );
}

