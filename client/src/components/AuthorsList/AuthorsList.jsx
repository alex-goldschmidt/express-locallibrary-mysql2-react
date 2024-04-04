import { useQuery } from "react-query";
import axios from "axios";
import "./AuthorsList.scss";

const fetchAuthors = async () => {
  const response = await axios.get("http://localhost:3000/catalog/authors");
  return response.data.authorsList;
};

const renderAuthors = (authors) => {
  const authorsListContent = authors.map((author) => (
    <li key={author.authorId}>
      <a href={`/author/${author.authorId}`}>{author.name} </a>
      {author.formattedDateOfBirth}-{author.formattedDateOfDeath}
    </li>
  ));

  return authorsListContent;
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
    <div className="authors">
      <h1 className="authors__header">Authors</h1>
      <ul className="authors__list">{renderAuthors(data)}</ul>
    </div>
  );
};

export default AuthorsList;
