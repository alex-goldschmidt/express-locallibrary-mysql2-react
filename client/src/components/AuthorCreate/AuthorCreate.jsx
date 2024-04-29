import { useState } from "react";
import { FormItem } from "../FormItem/FormItem";
import { createAuthor } from "../../api/AuthorApi";
import "./AuthorCreate.scss";

export const AuthorCreate = () => {
  const [authorData, setAuthorData] = useState({
    name: "",
    dateOfBirth: "",
    dateOfDeath: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;

    setAuthorData({
      ...authorData,
      [name]: value,
    });
  };

  const validateForm = () => {
    let errors = {};

    if (authorData.dateOfBirth === "" || !authorData.dateOfBirth) {
      errors.dateOfBirth = "Invalid date of birth";
    }

    if (authorData.dateOfDeath === "" || !authorData.dateOfDeath) {
      errors.dateOfDeath = "Invalid date of death";
    }

    setErrors(errors);

    return errors;
  };

  const renderAuthorForm = () => (
    <div className="form__author">
      <h1>Create Author</h1>
      <div className="form__author-item">
        <label htmlFor="name">Full Name:</label>
        <input
          id="name"
          className="form__author-item--input"
          type="text"
          placeholder="Full Name"
          name="name"
          required
          value={authorData.name}
          onChange={handleChange}
        />
      </div>
      <div className="form__author-item">
        <label htmlFor="dateOfBirth">Date of birth:</label>
        <input
          id="dateOfBirth"
          className="form__author-item--input"
          type="date"
          name="dateOfBirth"
          value={authorData.dateOfBirth}
          onChange={handleChange}
        />
      </div>
      <div className="form__author-item">
        <label htmlFor="dateOfDeath">Date of death:</label>
        <input
          id="dateOfDeath"
          className="form__author-item--input"
          type="date"
          name="dateOfDeath"
          value={authorData.dateOfDeath}
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
      const result = await createAuthor(authorData);
      const newAuthor = result.data.newAuthor;
      const redirectUrl = `/author/${newAuthor.id}`;
      window.location.href = redirectUrl;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <FormItem
      renderFunction={renderAuthorForm}
      onSubmitFunction={handleSubmit}
      errors={errors}
    />
  );
};

export default AuthorCreate;
