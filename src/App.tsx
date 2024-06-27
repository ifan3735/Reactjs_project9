// App.tsx
import React, { useReducer, useEffect, useCallback, useState } from 'react';
import BookForm from './components/BookForm';
import BookTable from './components/BookTable';
import { fetchBooks, addBook, updateBook, deleteBook } from './api/api.service';
import './styles/App.scss';

type Book = {
  id: number;
  title: string;
  author: string;
  year: number;
};

type Action =
  | { type: 'SET_BOOKS'; books: Book[] }
  | { type: 'ADD_BOOK'; book: Book }
  | { type: 'UPDATE_BOOK'; book: Book }
  | { type: 'DELETE_BOOK'; id: number };

const bookReducer = (state: Book[], action: Action): Book[] => {
  switch (action.type) {
    case 'SET_BOOKS':
      return action.books;
    case 'ADD_BOOK':
      return [...state, action.book];
    case 'UPDATE_BOOK':
      return state.map(book => book.id === action.book.id ? action.book : book);
    case 'DELETE_BOOK':
      return state.filter(book => book.id !== action.id);
    default:
      return state;
  }
};

const App: React.FC = () => {
  const [state, dispatch] = useReducer(bookReducer, []);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchBooks().then(books => {
      dispatch({ type: 'SET_BOOKS', books });
    });
  }, []);

  const handleAddBook = async (book: Omit<Book, 'id'>) => {
    const newBook = await addBook(book);
    if (newBook) dispatch({ type: 'ADD_BOOK', book: newBook });
  };

  const handleUpdateBook = async (book: Book) => {
    const updatedBook = await updateBook(book);
    if (updatedBook) dispatch({ type: 'UPDATE_BOOK', book: updatedBook });
  };

  const handleDeleteBook = async (id: number) => {
    const success = await deleteBook(id);
    if (success) dispatch({ type: 'DELETE_BOOK', id });
  };

  const handlePagination = useCallback((direction: 'next' | 'previous') => {
    if (direction === 'next' && (currentPage + 1) * 5 < state.length) {
      setCurrentPage(prev => prev + 1);
    }
    if (direction === 'previous' && currentPage > 0) {
      setCurrentPage(prev => prev - 1);
    }
  }, [currentPage, state.length]);

  const filteredBooks = state.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const booksToDisplay = filteredBooks.slice(currentPage * 5, (currentPage + 1) * 5);

  return (
    <div className="app">
      <h1>Book Repository App</h1>
      <BookForm onAddBook={handleAddBook} />
      <input
        type="text"
        placeholder="Search book by title..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        className="search-input"
      />
      <BookTable
        books={booksToDisplay}
        onUpdateBook={handleUpdateBook}
        onDeleteBook={handleDeleteBook}
      />
      <div className="pagination-controls">
        <button onClick={() => handlePagination('previous')} disabled={currentPage === 0}>
          Previous
        </button>
        <button onClick={() => handlePagination('next')} disabled={(currentPage + 1) * 5 >= filteredBooks.length}>
          Next
        </button>
      </div>
    </div>
  );
};

export default App;
