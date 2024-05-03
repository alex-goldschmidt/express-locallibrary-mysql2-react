import axios from "axios";
import { asyncHandler } from "../utils/asyncHandler";

export const fetchBook = async (bookId) => {
  const response = await axios.get(
    `http://localhost:3000/catalog/book/${bookId}`
  );
  if (!response || response.status !== 200) {
    throw new Error("Failed to fetch book data");
  }

  const data = {
    book: response.data.book,
    bookInstances: response.data.bookInstances,
  };

  return data;
};

export const fetchBooks = async () => {
  const response = await axios.get("http://localhost:3000/catalog/books");
  if (!response || response.status !== 200) {
    throw new Error("Failed to fetch book data");
  }

  return response.data.bookList;
};

export const createBook = asyncHandler(async (bookData) => {
  const response = await axios.post(
    `http://localhost:3000/catalog/book/create`,
    bookData
  );
  return response;
});
