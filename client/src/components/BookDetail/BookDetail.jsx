import { useParams } from "react-router-dom";
import { DataItem } from "../DataItem/DataItem";
import { fetchBook } from "../../api/BookApi";
import "./BookDetail.scss";

const renderBook = (data) => {
  if (!data.book) {
    return <div>No book data available</div>;
  }

  const bookData = data.book;
  const bookInstances = data.bookInstances;

  const bookInstanceItems = bookInstances.map((bookInstance) => (
    <li key={bookInstance.bookInstanceId}>
      <h3>{bookInstance.title}</h3>
      <div>{bookInstance.status}</div>
    </li>
  ));

  return (
    <div className="book">
      <h1>{bookData.title}</h1>
      <div>Author: {bookData.author}</div>
      <p>Summary: {bookData.summary}</p>
      <div>ISBN:{bookData.isbn}</div>
      <div>Genre{bookData.genre}</div>
      <ul>{bookInstanceItems}</ul>
    </div>
  );
};

export const BookDetail = () => {
  const { bookId } = useParams();
  const queryKey = ["book", bookId];
  const queryFunction = () => fetchBook(bookId);

  return (
    <DataItem
      queryKey={queryKey}
      queryFunction={queryFunction}
      renderFunction={renderBook}
      queryOptions={{ enabled: !!bookId }}
    />
  );
};

export default BookDetail;
