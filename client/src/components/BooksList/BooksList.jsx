import { useQuery } from "react-query";
import axios from "axios";
import "./BooksList.scss";

const fetchBooks = async () => {
  const response = await axios.get("http://localhost:3000/catalog/books");
  return response.data.bookList;
};

const renderBooks = (books) => {
  const booksListContent = books.map((book) => (
    <li key={book.bookId}>
      <a href={`/book/${book.bookId}`}>{book.title} </a>- By {book.author}
    </li>
  ));

  return booksListContent;
};

export const BooksList = () => {
  const { isLoading, error, data } = useQuery("books", fetchBooks);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="books">
      <h1 className="books__header">Books</h1>
      <ul className="books__list">{renderBooks(data)}</ul>
    </div>
  );
};

export default BooksList;
