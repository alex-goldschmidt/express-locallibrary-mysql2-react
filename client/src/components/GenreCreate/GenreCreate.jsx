import { useState } from "react";
import { FormItem } from "../FormItem/FormItem";
import { createGenre } from "../../api/GenreApi";
import "./GenreCreate.scss";

export const GenreCreate = () => {
  const [genreData, setGenreData] = useState({
    genreName: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;

    setGenreData({
      ...genreData,
      [name]: value,
    });
  };

  const validateForm = () => {
    let errors = {};

    if (genreData.genreName === "" || !genreData.genreName) {
      errors.genreName = "Invalid Genre";
    }

    setErrors(errors);

    return errors;
  };

  const renderGenreForm = () => (
    <div className="form__genre">
      <h1>Create Genre</h1>
      <div className="form__genre-item">
        <label htmlFor="genreName">Genre Name:</label>
        <input
          id="genreName"
          className="form__genre-item--input"
          type="text"
          placeholder="Genre Name"
          name="genreName"
          required
          value={genreData.genreName}
          onChange={handleChange}
        />
      </div>
    </div>
  );

  const handleSubmit = async (event) => {
    event.preventDefault();
    validateForm();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    try {
      const result = await createGenre(genreData);
      const newGenre = result.data.newGenre;
      const redirectUrl = `/genre/${newGenre.genreId}`;
      window.location.href = redirectUrl;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <FormItem
      renderFunction={renderGenreForm}
      onSubmitFunction={handleSubmit}
      errors={errors}
    />
  );
};

export default GenreCreate;
