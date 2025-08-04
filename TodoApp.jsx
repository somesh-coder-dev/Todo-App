import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TodoItem from './TodoItem';
import TodoForm from './TodoForm';
import './src/TodoApp.css';

const EmptyState = () => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="empty-state"
    >
        <h3>All tasks completed!</h3>
        <p>Time to relax or add a new goal.</p>
    </motion.div>
);

function TodoApp() {
    const [todos, setTodos] = useState(() => {
        try {
            const savedTodos = localStorage.getItem('todos');
            return savedTodos ? JSON.parse(savedTodos) : [];
        } catch (error) {
            console.error("Could not parse todos from localStorage", error);
            return [];
        }
    });

    const [theme, setTheme] = useState('dark');

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    useEffect(() => {
        document.body.setAttribute('data-theme', theme);
    }, [theme]);

    const addTodo = (text) => {
        const newTodos = [...todos, { text, isCompleted: false }];
        setTodos(newTodos);
    };

    const completeTodo = (index) => {
        const newTodos = [...todos];
        newTodos[index].isCompleted = !newTodos[index].isCompleted;
        setTodos(newTodos);
    };

    const removeTodo = (index) => {
        const newTodos = todos.filter((_, i) => i !== index);
        setTodos(newTodos);
    };

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    return (
        <motion.div 
            className="todo-app"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
        >
            <div className="header">
                <h1>Todo List</h1>
                <motion.button onClick={toggleTheme} className="theme-toggle" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    {theme === 'light' ? '🌙' : '☀️'}
                </motion.button>
            </div>
            <TodoForm addTodo={addTodo} />
            <motion.div className="todo-list">
                <AnimatePresence initial={false}>
                    {todos.length > 0 ? (
                        todos.map((todo, index) => (
                            <TodoItem
                                key={index}
                                index={index}
                                todo={todo}
                                completeTodo={completeTodo}
                                removeTodo={removeTodo}
                            />
                        ))
                    ) : (
                        <EmptyState />
                    )}
                </AnimatePresence>
            </motion.div>
        </motion.div>
    );
}

export default TodoApp;
