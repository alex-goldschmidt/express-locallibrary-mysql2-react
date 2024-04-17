import { useParams } from "react-router-dom";
import { DataItem } from "../DataItem/DataItem";
import { fetchAuthor } from "../../api/AuthorApi";
import "./AuthorDetail.scss";

const renderAuthor = (data) => {
  if (!data.author) {
    return <div>No author data available</div>;
  }

  const authorTitle = data.author.name;
  const authorBooks = data.authorBooks;

  if (!authorBooks || authorBooks.length === 0) {
    return (
      <div className="author">
        <h1>{authorTitle}</h1>
        <div>This author has no books</div>
      </div>
    );
  }

  const authorBookItems = authorBooks.map((book) => (
    <li key={book.bookId}>
      <h3>{book.bookTitle}</h3>
      <p>{book.bookSummary}</p>
    </li>
  ));

  return (
    <div className="author">
      <h1>{authorTitle}</h1>
      <ul>{authorBookItems}</ul>
    </div>
  );
};

export const AuthorDetail = () => {
  const { authorId } = useParams();
  const queryKey = ["author", authorId];
  const queryFunction = () => fetchAuthor(authorId);

  return (
    <DataItem
      queryKey={queryKey}
      queryFunction={queryFunction}
      renderFunction={renderAuthor}
      queryOptions={{ enabled: !!authorId }}
    />
  );
};

export default AuthorDetail;
