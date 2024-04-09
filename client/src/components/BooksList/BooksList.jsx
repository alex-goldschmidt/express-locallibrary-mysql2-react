import axios from "axios";
import { DataList } from "../DataList/DataList";

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
  return (
    <DataList
      queryKey="books"
      queryFn={fetchBooks}
      renderFn={renderBooks}
      className="books"
      title="Books"
    />
  );
};

export default BooksList;
