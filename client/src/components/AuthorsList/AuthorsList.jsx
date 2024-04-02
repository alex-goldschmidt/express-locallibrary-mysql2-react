import { useQuery } from "react-query";
import axios from "axios";

const fetchAuthors = async () => {
  const response = await axios.get("http://localhost:3000/catalog/authors");
  return response.data.authorsList;
};

export const AuthorsList = () => {
  const { isLoading, error, data } = useQuery("authors", fetchAuthors);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>Authors</h1>
      <ul>
        {data.map((author) => (
          <li key={author.authorId}>{author.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default AuthorsList;
