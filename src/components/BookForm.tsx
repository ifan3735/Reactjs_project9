// BookForm.tsx
import React, { useState } from 'react';
import './BookForm.scss';

type BookFormProps = {
  onAddBook: (book: { title: string; author: string; year: number }) => void;
};

const BookForm: React.FC<BookFormProps> = ({ onAddBook }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [year, setYear] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddBook({ title, author, year });
    setTitle('');
    setAuthor('');
    setYear(0);
  };

  return (
    <form className="book-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Book Title"
        required
      />
      <input
        type="text"
        value={author}
        onChange={e => setAuthor(e.target.value)}
        placeholder="Book Author"
        required
      />
      <input
        type="number"
        value={year}
        onChange={e => setYear(parseInt(e.target.value))}
        placeholder="Year of Publication"
        required
      />
      <button type="submit">Add Book</button>
    </form>
  );
};

export default BookForm;
