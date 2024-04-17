import { useParams } from "react-router-dom";
import { DataItem } from "../DataItem/DataItem";
import { fetchGenre } from "../../api/GenreApi";
import "./GenreDetail.scss";

const renderGenre = (data) => {
  if (!data.genre) {
    return <div>No genre data available</div>;
  }

  const genreTitle = data.genre.genreName;
  const booksInGenreData = data.booksInGenre;

  const booksInGenreItems = booksInGenreData.map((book) => (
    <li key={book.bookId}>
      <h3>{book.bookTitle}</h3>
      <p>{book.bookSummary}</p>
    </li>
  ));

  return (
    <div className="genre">
      <h1>{genreTitle}</h1>
      <ul>{booksInGenreItems}</ul>
    </div>
  );
};

export const GenreDetail = () => {
  const { genreId } = useParams();
  const queryKey = ["genre", genreId];
  const queryFunction = () => fetchGenre(genreId);

  return (
    <DataItem
      queryKey={queryKey}
      queryFunction={queryFunction}
      renderFunction={renderGenre}
      queryOptions={{ enabled: !!genreId }}
    />
  );
};

export default GenreDetail;
