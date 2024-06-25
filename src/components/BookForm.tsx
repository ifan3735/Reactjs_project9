import React, { useRef } from 'react';
import './BookForm.scss';

type BookFormProps = {
  onAddBook: (book: { id: number; title: string; author: string; year: number }) => void;
};

const BookForm: React.FC<BookFormProps> = ({ onAddBook }) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const authorRef = useRef<HTMLInputElement>(null);
  const yearRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (titleRef.current && authorRef.current && yearRef.current) {
      const newBook = {
        id: Date.now(),
        title: titleRef.current.value,
        author: authorRef.current.value,
        year: parseInt(yearRef.current.value, 10),
      };
      onAddBook(newBook);
      titleRef.current.value = '';
      authorRef.current.value = '';
      yearRef.current.value = '';
    }
  };

  return (
    <form className="book-form" onSubmit={handleSubmit}>
      <input ref={titleRef} type="text" placeholder="Book Title" required />
      <input ref={authorRef} type="text" placeholder="Book Author" required />
      <input ref={yearRef} type="number" placeholder="Year of Production" required />
      <button type="submit">Add Book</button>
    </form>
  );
};

export default BookForm;
