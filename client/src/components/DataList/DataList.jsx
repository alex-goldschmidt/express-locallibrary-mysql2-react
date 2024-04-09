import { useQuery } from "react-query";
import PropTypes from "prop-types";

DataList.propTypes = {
  queryKey: PropTypes.string.isRequired,
  queryFunction: PropTypes.func.isRequired,
  renderFunction: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export const DataList = ({
  queryKey,
  queryFunction,
  renderFunction,
  className,
  title,
}) => {
  const { isLoading, error, data } = useQuery(queryKey, queryFunction);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className={className}>
      <h1 className={`${className}__header`}>{title}</h1>
      <ul className={`${className}__list`}>{renderFunction(data)}</ul>
    </div>
  );
};
