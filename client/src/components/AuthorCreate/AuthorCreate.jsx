import { FormItem } from "../FormItem/FormItem";
import "./AuthorCreate.scss";

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
      />
    </div>
    <div className="form__author-item">
      <label htmlFor="dateOfBirth">Date of birth:</label>
      <input
        id="dateOfBirth"
        className="form__author-item--input"
        type="date"
        name="dateOfBirth"
      />
    </div>
    <div className="form__author-item">
      <label htmlFor="dateOfDeath">Date of death:</label>
      <input
        id="dateOfDeath"
        className="form__author-item--input"
        type="date"
        name="dateOfDeath"
      />
    </div>
  </div>
);

export const AuthorCreate = () => {
  return <FormItem renderFunction={renderAuthorForm} />;
};

export default AuthorCreate;
