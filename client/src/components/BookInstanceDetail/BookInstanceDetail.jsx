import { useParams } from "react-router-dom";
import { DataItem } from "../DataItem/DataItem";
import { fetchBookInstance } from "../../api/BookInstanceApi";
import "./BookInstanceDetail.scss";

const renderBookInstance = (data) => {
  const bookInstance = data.bookInstance;

  if (!bookInstance) {
    return <div>No book data available</div>;
  }

  return (
    <div className="bookInstance">
      <h1>{bookInstance.title}</h1>
      <div>Title: {bookInstance.title}</div>
      <p>Imprint: {bookInstance.imprint}</p>
      <div>Status: {bookInstance.status}</div>
    </div>
  );
};

export const BookInstanceDetail = () => {
  const { bookInstanceId } = useParams();
  const queryKey = ["bookInstance", bookInstanceId];
  const queryFunction = () => fetchBookInstance(bookInstanceId);

  return (
    <DataItem
      queryKey={queryKey}
      queryFunction={queryFunction}
      renderFunction={renderBookInstance}
      queryOptions={{ enabled: !!bookInstanceId }}
    />
  );
};

export default BookInstanceDetail;
