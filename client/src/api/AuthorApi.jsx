import axios from "axios";

export const fetchAuthor = async (authorId) => {
  const response = await axios.get(
    `http://localhost:3000/catalog/author/${authorId}`
  );

  if (!response || response.status !== 200) {
    throw new Error("Failed to fetch author data");
  }

  const data = {
    author: response.data.author,
    authorBooks: response.data.authorBooks,
  };

  return data;
};

export const fetchAuthors = async () => {
  const response = await axios.get("http://localhost:3000/catalog/authors");

  if (!response || response.status !== 200) {
    throw new Error("Failed to fetch author data");
  }

  return response.data.authorsList;
};

export const createAuthor = async (authorData) => {
  const response = await axios.post(
    `http://localhost:3000/catalog/author/create`,
    authorData
  );

  if (!response || response.status !== 201) {
    throw new Error("Failed to create author");
  }

  return response.data;
};
