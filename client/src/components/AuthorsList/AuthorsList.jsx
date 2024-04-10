import axios from "axios";
import "./AuthorsList.scss";
import { DataList } from "../DataList/DataList";

const fetchAuthors = async () => {
  const response = await axios.get("http://localhost:3000/catalog/authors");
  return response.data.authorsList;
};

const renderAuthors = (authors) => {
  const authorsListItems = authors.map((author) => (
    <li key={author.authorId}>
      <a href={`/author/${author.authorId}`}>{author.name} </a>
      {author.formattedDateOfBirth}-{author.formattedDateOfDeath}
    </li>
  ));

  return authorsListItems;
};

export const AuthorsList = () => {
  return (
    <DataList
      queryKey="authors"
      queryFunction={fetchAuthors}
      renderFunction={renderAuthors}
      className="authors"
      title="Authors"
    />
  );
};

export default AuthorsList;
