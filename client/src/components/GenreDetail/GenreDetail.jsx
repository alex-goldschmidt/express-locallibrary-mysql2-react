import axios from "axios";
import { useParams } from "react-router-dom";
import { DataItem } from "../DataItem/DataItem";
import "./GenreDetail.scss";

const fetchGenre = async (genreId) => {
  const response = await axios.get(
    `http://localhost:3000/catalog/genre/${genreId}`
  );
  if (!response || response.status !== 200) {
    throw new Error("Failed to fetch genre data");
  }

  const data = {
    genre: response.data.genre,
    booksInGenre: response.data.booksInGenre,
  };

  return data;
};

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
