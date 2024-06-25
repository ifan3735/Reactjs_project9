import React, { useReducer, useEffect, useCallback, useState } from 'react';
import BookForm from './components/BookForm';
import BookTable from './components/BookTable';
import { useLocalStorage } from './hooks/useLocalStorage';
import './styles/App.scss';

type Book = {
  id: number;
  title: string;
  author: string;
  year: number;
};

type Action =
  | { type: 'ADD_BOOK'; book: Book }
  | { type: 'UPDATE_BOOK'; book: Book }
  | { type: 'DELETE_BOOK'; id: number };

const bookReducer = (state: Book[], action: Action): Book[] => {
  switch (action.type) {
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

const initialBooks: Book[] = [
  { id: 1, title: "To Kill a Mockingbird", author: "Harper Lee", year: 1960 },
  { id: 2, title: "1984", author: "George Orwell", year: 1949 },
  { id: 3, title: "The Great Gatsby", author: "F. Scott Fitzgerald", year: 1925 },
  { id: 4, title: "Pride and Prejudice", author: "Jane Austen", year: 1813 },
  { id: 5, title: "The Catcher in the Rye", author: "J.D. Salinger", year: 1951 },
  { id: 6, title: "Moby-Dick", author: "Herman Melville", year: 1851 },
  { id: 7, title: "War and Peace", author: "Leo Tolstoy", year: 1869 },
  { id: 8, title: "The Odyssey", author: "Homer", year: -800 },
  { id: 9, title: "Ulysses", author: "James Joyce", year: 1922 },
  { id: 10, title: "The Divine Comedy", author: "Dante Alighieri", year: 1320 },
  { id: 11, title: "Alice's Adventures in Wonderland", author: "Lewis Carroll", year: 1865 },
  { id: 12, title: "Jane Eyre", author: "Charlotte Brontë", year: 1847 },
  { id: 13, title: "The Lord of the Rings", author: "J.R.R. Tolkien", year: 1954 },
  { id: 14, title: "Crime and Punishment", author: "Fyodor Dostoevsky", year: 1866 },
  { id: 15, title: "The Brothers Karamazov", author: "Fyodor Dostoevsky", year: 1880 },
  { id: 16, title: "The Hobbit", author: "J.R.R. Tolkien", year: 1937 },
  { id: 17, title: "Anna Karenina", author: "Leo Tolstoy", year: 1877 },
  { id: 18, title: "Don Quixote", author: "Miguel de Cervantes", year: 1615 },
  { id: 19, title: "One Hundred Years of Solitude", author: "Gabriel García Márquez", year: 1967 },
  { id: 20, title: "The Iliad", author: "Homer", year: -750 }
];

const App: React.FC = () => {
  const [storedBooks, setStoredBooks] = useLocalStorage<Book[]>('books', initialBooks);
  const [state, dispatch] = useReducer(bookReducer, storedBooks);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  const handleAddBook = (book: Book) => dispatch({ type: 'ADD_BOOK', book });
  const handleUpdateBook = (book: Book) => dispatch({ type: 'UPDATE_BOOK', book });
  const handleDeleteBook = (id: number) => dispatch({ type: 'DELETE_BOOK', id });

  useEffect(() => {
    setStoredBooks(state);
  }, [state, setStoredBooks]);

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
