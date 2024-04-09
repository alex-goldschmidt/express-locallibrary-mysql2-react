import axios from "axios";
import "./AuthorsList.scss";
import { DataList } from "../DataList/DataList";

const fetchAuthors = async () => {
  const response = await axios.get("http://localhost:3000/catalog/authors");
  return response.data.authorsList;
};

const renderAuthors = (authors) => {
  return authors.map((author) => (
    <li key={author.authorId}>
      <a href={`/author/${author.authorId}`}>{author.name} </a>
      {author.formattedDateOfBirth}-{author.formattedDateOfDeath}
    </li>
  ));
};

export const AuthorsList = () => {
  return (
    <DataList
      queryKey="authors"
      queryFn={fetchAuthors}
      renderFn={renderAuthors}
      className="authors"
      title="authors"
    />
  );
};

export default AuthorsList;
