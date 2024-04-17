import axios from "axios";

export const fetchGenre = async (genreId) => {
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

export const fetchGenres = async () => {
  const response = await axios.get("http://localhost:3000/catalog/genres");

  if (!response || response.status !== 200) {
    throw new Error("Failed to fetch genre data");
  }

  return response.data.genresList;
};
