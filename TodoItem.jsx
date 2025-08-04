import React from 'react';
import { motion } from 'framer-motion';

const todoVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.8 },
    visible: { 
        opacity: 1, 
        y: 0, 
        scale: 1,
        transition: { type: 'spring', stiffness: 120, damping: 12 }
    },
    exit: { 
        opacity: 0, 
        scale: 0.5, 
        x: -100,
        transition: { duration: 0.3, ease: 'easeIn' }
    },
};

const Checkbox = ({ isCompleted, onToggle }) => (
    <motion.div 
        className="checkbox"
        onClick={onToggle}
        whileHover={{ scale: 1.2 }}
        transition={{ type: 'spring', stiffness: 300 }}
        data-completed={isCompleted}
    >
        <motion.svg 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
        >
            <motion.path 
                className="checkmark"
                d="M5 13l4 4L19 7" 
                strokeWidth="3" 
                fill="none" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                initial={false}
                animate={{ pathLength: isCompleted ? 1 : 0 }}
            />
        </motion.svg>
    </motion.div>
);

function TodoItem({ todo, index, completeTodo, removeTodo }) {
    return (
        <motion.div
            className={`todo-item ${todo.isCompleted ? 'completed' : ''}`}
            variants={todoVariants}
            layout
            whileHover={{ 
                scale: 1.03,
                boxShadow: '0 10px 20px rgba(0,0,0,0.2)',
            }}
        >
            <Checkbox isCompleted={todo.isCompleted} onToggle={() => completeTodo(index)} />
            <motion.span
                animate={{
                    x: todo.isCompleted ? 15 : 0,
                    opacity: todo.isCompleted ? 0.5 : 1,
                }}
                transition={{ type: 'spring', stiffness: 200, damping: 25 }}
            >
                {todo.text}
            </motion.span>
            <div className="buttons">
                <motion.button 
                    className="remove-btn" 
                    onClick={() => removeTodo(index)}
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    whileTap={{ scale: 0.9 }}
                >
                    Remove
                </motion.button>
            </div>
        </motion.div>
    );
}

export default TodoItem;
