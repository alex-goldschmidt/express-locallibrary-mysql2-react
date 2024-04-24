import PropTypes from "prop-types";
import "./FormItem.scss";

export const FormItem = ({ renderFunction, onSubmitFunction }) => {
  return (
    <form method="POST" onSubmit={onSubmitFunction}>
      {renderFunction()}
      <button type="submit" className="submit">
        Submit
      </button>
    </form>
  );
};

FormItem.propTypes = {
  renderFunction: PropTypes.func.isRequired,
  onSubmitFunction: PropTypes.func.isRequired,
};
