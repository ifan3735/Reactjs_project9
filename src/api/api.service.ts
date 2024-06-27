// api.service.ts
import axios from 'axios';

const API_URL = 'http://localhost:3000';

export type Book = {
  id: number;
  title: string;
  author: string;
  year: number;
};

// Fetch all books
export const fetchBooks = async (): Promise<Book[]> => {
  try {
    const response = await axios.get<Book[]>(`${API_URL}/books`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch books:', error);
    return [];
  }
};

// Fetch a single book by ID
export const fetchOneBook = async (id: number): Promise<Book | null> => {
  try {
    const response = await axios.get<Book>(`${API_URL}/books/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch book with id ${id}:`, error);
    return null;
  }
};

// Add a new book
export const addBook = async (book: Omit<Book, 'id'>): Promise<Book | null> => {
  try {
    const response = await axios.post<Book>(`${API_URL}/books`, book);
    return response.data;
  } catch (error) {
    console.error('Failed to add book:', error);
    return null;
  }
};

// Update an existing book
export const updateBook = async (book: Book): Promise<Book | null> => {
  try {
    const response = await axios.put<Book>(`${API_URL}/books/${book.id}`, book);
    return response.data;
  } catch (error) {
    console.error(`Failed to update book with id ${book.id}:`, error);
    return null;
  }
};

// Delete a book by ID
export const deleteBook = async (id: number): Promise<boolean> => {
  try {
    await axios.delete(`${API_URL}/books/${id}`);
    return true;
  } catch (error) {
    console.error(`Failed to delete book with id ${id}:`, error);
    return false;
  }
};
