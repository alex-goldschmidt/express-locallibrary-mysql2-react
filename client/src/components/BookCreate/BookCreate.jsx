import { useState } from "react";
import { FormItem } from "../FormItem/FormItem";
import { createBook } from "../../api/BookApi";
import { fetchAuthors } from "../../api/AuthorApi";
import { fetchGenres } from "../../api/GenreApi";
import { useQuery } from "react-query";

import "./BookCreate.scss";

export const BookCreate = () => {
  const [bookData, setBookData] = useState({});
  const [errors, setErrors] = useState({});
  const {
    data: authors,
    isLoading: authorsLoading,
    error: authorsError,
  } = useQuery("authors", fetchAuthors);

  const {
    data: genres,
    isLoading: genresLoading,
    error: genresError,
  } = useQuery("genres", fetchGenres);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setBookData({
      ...bookData,
      [name]: value,
    });
  };

  const initialGenreOptionString = "Please select an genre";
  const initialAuthorOptionString = "Please select an author";

  const validateForm = () => {
    let errors = {};

    if (bookData.title === "" || !bookData.title) {
      errors.title = "Invalid Title";
    }

    if (
      bookData.author === "" ||
      !bookData.author ||
      bookData.author === initialAuthorOptionString
    ) {
      errors.author = "Invalid Author";
    }

    if (bookData.summary === "" || !bookData.summary) {
      errors.author = "Invalid Summary";
    }

    if (
      bookData.genre === "" ||
      !bookData.genre ||
      bookData.genre === initialGenreOptionString
    ) {
      errors.author = "Invalid Genre";
    }

    if (bookData.isbn === "" || !bookData.isbn) {
      errors.author = "Invalid ISBN";
    }

    setErrors(errors);

    return errors;
  };

  const renderBookForm = () => (
    <div className="form__book">
      <h1>Create Book</h1>
      <div className="form__book-item">
        <label htmlFor="title">Title:</label>
        <input
          id="title"
          className="form__book-item--input"
          type="text"
          placeholder="Title"
          name="title"
          required
          value={bookData.title}
          onChange={handleChange}
        />
      </div>
      <div className="form__book-item">
        <label htmlFor="author">Author:</label>
        {authorsLoading ? (
          <div>Loading...</div>
        ) : authorsError ? (
          <div>An error occurred: {authorsError.message}</div>
        ) : (
          <select
            id="author"
            className="form__book-item--input"
            name="author"
            onChange={handleChange}
            value={bookData.author}
          >
            <option>{initialAuthorOptionString}</option>
            {authors.map((author) => (
              <option key={author.id} value={author.id}>
                {author.name}
              </option>
            ))}
          </select>
        )}
      </div>
      <div className="form__book-item">
        <label htmlFor="summary">Summary:</label>
        <input
          id="summary"
          className="form__book-item--input"
          type="text"
          name="summary"
          value={bookData.summary}
          onChange={handleChange}
        />
      </div>
      <div className="form__book-item">
        <label htmlFor="summary">Genre:</label>
        {genresLoading ? (
          <div>Loading...</div>
        ) : genresError ? (
          <div>An error occurred: {genresError.message}</div>
        ) : (
          <select
            className="form__book-item--input"
            id="genre"
            name="genre"
            onChange={handleChange}
            value={bookData.genre}
          >
            <option>{initialGenreOptionString}</option>
            {genres.map((genre) => (
              <option key={genre.id} value={genre.id}>
                {genre.genreName}
              </option>
            ))}
          </select>
        )}
      </div>
      <div className="form__book-item">
        <label htmlFor="summary">ISBN:</label>
        <input
          id="isbn"
          className="form__book-item--input"
          type="text"
          name="isbn"
          value={bookData.isbn}
          onChange={handleChange}
        />
      </div>
    </div>
  );

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    try {
      const result = await createBook(bookData);
      const newBook = result.data.newBook;
      const redirectUrl = `/book/${newBook.id}`;
      window.location.href = redirectUrl;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <FormItem
      renderFunction={renderBookForm}
      onSubmitFunction={handleSubmit}
      errors={errors}
    />
  );
};

export default BookCreate;
