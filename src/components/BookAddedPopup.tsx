import React, { useEffect } from 'react';
import './BookAddedPopup.css';

interface BookAddedPopupProps {
    book: { title: string; image?: string };
    onClose: () => void;
}

const BookAddedPopup: React.FC<BookAddedPopupProps> = ({ book, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 1500); // Close the popup after 3 seconds

        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className="popup">
            <img src={book.image} alt={book.title} />
            <div className="popup-info">
                <h3>{book.title}</h3>
                <p font-family='Roman'>Book added to library</p>
            </div>
        </div>
    );
};

export default BookAddedPopup;
