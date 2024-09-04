import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import Library from './components/Library';
import BookAddedPopup from './components/BookAddedPopup';
import ChatTerminal from './components/ChatTerminal';
import Footer from './components/Footer';
import './App.css';

export interface Book {
    id: string;
    title: string;
    authors?: string[];
    image?: string;
}

function App() {
    const [view, setView] = useState<'search' | 'library' | 'converse'>('search');
    const [library, setLibrary] = useState<Book[]>([]);
    const [popupBook, setPopupBook] = useState<Book | null>(null);

    const addBookToLibrary = (book: Book) => {
        setLibrary((prevLibrary) => {
            if (!prevLibrary.find((item) => item.id === book.id)) {
                setPopupBook(book); // Trigger popup

                return [...prevLibrary, book]; // Adds book to library
            }
            return prevLibrary;
        });
    };

    const handleClosePopup = () => {
        setPopupBook(null);
    };

    return (
        <div className="App">
            <header className="App-header">
                <h1>Po<strong><em>ll<small>(m)</small></em></strong>y</h1>
                <nav>
                    <button onClick={() => setView('search')}>Search</button>
                    <button onClick={() => setView('library')}>Library</button>
                    <button onClick={() => setView('converse')}>Converse</button>
                </nav>
            </header>
            <main>
                {view === 'search' ? (
                    <SearchBar addBookToLibrary={addBookToLibrary} />
                ) : view === 'library' ? (
                    <Library
                        library={library}
                        removeBookFromLibrary={(id) => {
                            setLibrary(library.filter(book => book.id !== id));
                        }}
                    />
                ) : (
                    <ChatTerminal library={library} /> // Show the chat terminal for the converse view
                )}
            </main>
            {popupBook && (
                <BookAddedPopup book={popupBook} onClose={handleClosePopup} />
            )}
            <Footer />
        </div>
    );
}

export default App;
