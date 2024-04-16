import axios from "axios";
import { useParams } from "react-router-dom";
import { DataItem } from "../DataItem/DataItem";
import "./BookInstanceDetail.scss";

const fetchBookInstance = async (bookInstanceId) => {
  const response = await axios.get(
    `http://localhost:3000/catalog/bookInstance/${bookInstanceId}`
  );
  if (!response || response.status !== 200) {
    throw new Error("Failed to fetch book data");
  }

  const data = {
    bookInstance: response.data.bookInstance,
  };

  return data;
};

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
