import PropTypes from "prop-types";
import "./FormItem.scss";

export const FormItem = ({ renderFunction, onSubmitFunction }) => {
  return (
    <form method="POST">
      {renderFunction()}
      <button type="submit" className="submit" onSubmit={onSubmitFunction}>
        Submit
      </button>
    </form>
  );
};

FormItem.propTypes = {
  renderFunction: PropTypes.func.isRequired,
  onSubmitFunction: PropTypes.func.isRequired,
};
