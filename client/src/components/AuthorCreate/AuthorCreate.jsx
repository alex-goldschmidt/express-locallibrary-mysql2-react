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

  const handleChange = (event) => {
    const { name, value } = event.target;

    setAuthorData({
      ...authorData,
      [name]: value,
    });
  };

  const renderAuthorForm = () => (
    <div className="form__author">
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
    try {
      const result = await createAuthor(authorData);
      const newAuthor = result.data.newAuthor;
      const redirectUrl = `http://localhost:5173/author/${newAuthor.id}`;
      window.location.href = redirectUrl;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FormItem
      renderFunction={renderAuthorForm}
      onSubmitFunction={handleSubmit}
    />
  );
};

export default AuthorCreate;
