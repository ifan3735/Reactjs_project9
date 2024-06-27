// BookTable.tsx
import React, { useState, useRef } from 'react';
import './BookTable.scss';

type Book = {
  id: number;
  title: string;
  author: string;
  year: number;
};

type BookTableProps = {
  books: Book[];
  onUpdateBook: (book: Book) => void;
  onDeleteBook: (id: number) => void;
};

const BookTable: React.FC<BookTableProps> = ({ books, onUpdateBook, onDeleteBook }) => {
  const [editingBookId, setEditingBookId] = useState<number | null>(null);
  const titleRef = useRef<HTMLInputElement>(null);
  const authorRef = useRef<HTMLInputElement>(null);
  const yearRef = useRef<HTMLInputElement>(null);

  const handleEdit = (book: Book) => {
    setEditingBookId(book.id);
    if (titleRef.current) titleRef.current.value = book.title;
    if (authorRef.current) authorRef.current.value = book.author;
    if (yearRef.current) yearRef.current.value = book.year.toString();
  };

  const handleSave = (id: number) => {
    if (titleRef.current && authorRef.current && yearRef.current) {
      const updatedBook = {
        id,
        title: titleRef.current.value,
        author: authorRef.current.value,
        year: parseInt(yearRef.current.value, 10),
      };
      onUpdateBook(updatedBook);
      setEditingBookId(null);
    }
  };

  return (
    <table className="book-table">
      <thead>
        <tr>
          <th>Title</th>
          <th>Author</th>
          <th>Year</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {books.map((book) => (
          <tr key={book.id}>
            <td>
              {editingBookId === book.id ? (
                <input ref={titleRef} type="text" defaultValue={book.title} />
              ) : (
                book.title
              )}
            </td>
            <td>
              {editingBookId === book.id ? (
                <input ref={authorRef} type="text" defaultValue={book.author} />
              ) : (
                book.author
              )}
            </td>
            <td>
              {editingBookId === book.id ? (
                <input ref={yearRef} type="number" defaultValue={book.year.toString()} />
              ) : (
                book.year
              )}
            </td>
            <td>
              {editingBookId === book.id ? (
                <button onClick={() => handleSave(book.id)}>Save</button>
              ) : (
                <button onClick={() => handleEdit(book)}>Edit</button>
              )}
              <button onClick={() => onDeleteBook(book.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BookTable;
