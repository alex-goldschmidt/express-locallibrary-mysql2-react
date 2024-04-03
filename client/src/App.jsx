import "./App.scss";
import { useQuery } from "react-query";
import axios from "axios";

const fetchCounts = async () => {
  const response = await axios.get("http://localhost:3000/catalog/");
  const countsData = response.data;
  return countsData;
};

export const App = () => {
  const { isLoading, error, data } = useQuery("counts", fetchCounts);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <div className="home">
      <div className="home__header">
        <h1>Local Library</h1>
        <p>
          Welcome to <em>LocalLibrary</em>, a very basic Express website
          developed as a tutorial example on the Mozilla Developer Network.
        </p>
      </div>
      <div className="home__stats">
        <h1>Dynamic content</h1>
        <p>The library has the following record counts:</p>
        <ul className="home__stats--counts">
          <li>
            <strong>Books:</strong> {data.bookCount}
          </li>
          <li>
            <strong>Copies:</strong> {data.bookInstancesCount}
          </li>
          <li>
            <strong>Copies available:</strong>
            {data.bookInstancesAvailableCount}
          </li>
          <li>
            <strong>Authors:</strong> {data.authorCount}
          </li>
          <li>
            <strong>Genres:</strong> {data.genreCount}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default App;
