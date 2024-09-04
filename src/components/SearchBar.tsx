import React, { useState } from 'react';
import axios from 'axios';
import BookItem from './BookItem';
import { Book } from '../App';
import './SearchBar.css';

interface SearchBarProps {
    addBookToLibrary: (book: Book) => void;
}

function SearchBar({ addBookToLibrary }: SearchBarProps) {
    const [query, setQuery] = useState<string>('');
    const [suggestions, setSuggestions] = useState<Book[]>([]);

    const fetchBooks = async (searchTerm: string) => {
        if (searchTerm.length > 2) {
            try {
                const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${searchTerm}`);
                const books = response.data.items.map((item: any) => ({
                    id: item.id,
                    title: item.volumeInfo.title,
                    authors: item.volumeInfo.authors,
                    image: item.volumeInfo.imageLinks?.thumbnail,
                }));
                setSuggestions(books);
            } catch (error) {
                console.error("Error fetching books:", error);
            }
        } else {
            setSuggestions([]);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchTerm = e.target.value;
        setQuery(searchTerm);
        fetchBooks(searchTerm);
    };

    return (
        <div className="search-bar">
            <input
                type="text"
                value={query}
                onChange={handleInputChange}
                placeholder="Search Books"
            />
            <div className="suggestions">
                {suggestions.map((book) => (
                    <BookItem
                        key={book.id}
                        book={book}
                        onClick={() => addBookToLibrary(book)}
                    />
                ))}
            </div>
        </div>
    );
}

export default SearchBar;
