import axios from "axios";
import "./GenresList.scss";
import { DataList } from "../DataList/DataList";

const fetchGenres = async () => {
  const response = await axios.get("http://localhost:3000/catalog/genres");
  return response.data.genresList;
};

const renderGenres = (genres) => {
  const genreListItems = genres.map((genre) => (
    <li key={genre.genreId}>
      <a href={`/genre/${genre.genreId}`}>{genre.genreName}</a>
    </li>
  ));
  return genreListItems;
};

export const GenresList = () => {
  return (
    <DataList
      queryKey="genres"
      queryFunction={fetchGenres}
      renderFunction={renderGenres}
      className="genres"
      title="Genres"
    />
  );
};

export default GenresList;
