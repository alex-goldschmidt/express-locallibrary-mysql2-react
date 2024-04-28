import PropTypes from "prop-types";
import "./FormItem.scss";

export const FormItem = ({ renderFunction, onSubmitFunction, errors }) => {
  return (
    <form method="POST" onSubmit={onSubmitFunction}>
      {renderFunction()}
      <button type="submit" className="submit">
        Submit
      </button>
      {errors && (
        <ul className="errors-list">
          {Object.values(errors).map((error, index) => (
            <li key={index} className="errors-list__error">
              {error}
            </li>
          ))}
        </ul>
      )}
    </form>
  );
};

FormItem.propTypes = {
  renderFunction: PropTypes.func.isRequired,
  onSubmitFunction: PropTypes.func.isRequired,
  errors: PropTypes.object,
};
