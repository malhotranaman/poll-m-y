import React from 'react';
import { Book } from '../App'; // Correct import from App.tsx
import './BookItem.css';
import { FaTrash } from 'react-icons/fa';

interface BookItemProps {
    book: Book;
    onRemove?: () => void;
    onClick?: () => void;
}

function BookItem({ book, onRemove, onClick}: BookItemProps) {
    return (
        <div className="book-item" onClick={onClick}>
            <img src={book.image} alt={book.title} />
            <div className="book-info">
                <h3>{book.title}</h3>
                <p>{book.authors ? book.authors.join(', ') : 'Unknown Author'}</p>
            </div>
            {onRemove && (
                <button className="remove-button" onClick={onRemove}>
                    <FaTrash /> {/* Trash icon from react-icons */}
                </button>
            )}
        </div>
    );
}

export default BookItem;
