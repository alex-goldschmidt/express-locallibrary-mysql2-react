import { useQuery } from "react-query";
import PropTypes from "prop-types";

export const DataItem = ({
  queryKey,
  queryFunction,
  renderFunction,
  queryOptions,
}) => {
  const { isLoading, error, data } = useQuery(
    queryKey,
    queryFunction,
    queryOptions
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return <>{renderFunction(data)}</>;
};

DataItem.propTypes = {
  queryKey: PropTypes.string.isRequired,
  queryFunction: PropTypes.func.isRequired,
  renderFunction: PropTypes.func.isRequired,
  queryOptions: PropTypes.object,
};
