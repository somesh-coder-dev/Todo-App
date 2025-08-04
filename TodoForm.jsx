import React, { useState } from 'react';
import { motion } from 'framer-motion';

function TodoForm({ addTodo }) {
    const [value, setValue] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!value.trim()) return;
        addTodo(value);
        setValue('');
    };

    return (
        <motion.form 
            onSubmit={handleSubmit} 
            className="todo-form"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <input
                type="text"
                className="input"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Add a new task..."
            />
            <motion.button 
                type="submit"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: 'spring', stiffness: 300 }}
            >
                Add Task
            </motion.button>
        </motion.form>
    );
}

export default TodoForm;
