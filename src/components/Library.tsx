import React from 'react';
import BookItem from './BookItem';
import { Book } from '../App'; // Correct import from App.tsx
import './Library.css';

interface LibraryProps {
    library: Book[];
    removeBookFromLibrary: (id: string) => void;
}

function Library({ library, removeBookFromLibrary }: LibraryProps) {
    return (
        <div className="library">
            <h2>Your Library</h2>
            {library.length === 0 ? (
                <p>No books in your library.</p>
            ) : (
                <div className="library-list">
                    {library.map((book) => (
                        <BookItem
                            key={book.id}
                            book={book}
                            onRemove={() => removeBookFromLibrary(book.id)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default Library;
