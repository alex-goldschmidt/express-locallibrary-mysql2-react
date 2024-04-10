import axios from "axios";
import { DataList } from "../DataList/DataList";
import "./BookInstancesList.scss";

const fetchBookInstances = async () => {
  const response = await axios.get(
    "http://localhost:3000/catalog/bookInstances"
  );
  return response.data.bookInstancesList;
};

const renderBookInstances = (bookInstances) => {
  const BookInstancesListItems = bookInstances.map((bookInstance) => {
    const bookInstanceStatus = bookInstance.status?.trim();
    const dueDate = bookInstance.formattedDueDate;

    return (
      <li key={bookInstance.bookInstanceId} className="bookInstance">
        <a href={`/bookInstance/${bookInstance.bookInstanceId}`}>
          {bookInstance.title}-{" "}
        </a>

        {bookInstanceStatus === "Available" && (
          <span className="bookInstance__available">{bookInstance.status}</span>
        )}

        {bookInstanceStatus === "Maintenance" && (
          <span className="bookInstance__maintenance">
            {bookInstanceStatus} {dueDate ? `(Due: ${dueDate})` : ""}
          </span>
        )}

        {bookInstanceStatus === "Loaned" && (
          <span className="bookInstance__loaned">
            {bookInstanceStatus} {dueDate ? `(Due: ${dueDate})` : ""}
          </span>
        )}
      </li>
    );
  });

  return BookInstancesListItems;
};

export const BookInstancesList = () => {
  return (
    <DataList
      queryKey="bookInstances"
      queryFunction={fetchBookInstances}
      renderFunction={renderBookInstances}
      className="bookInstances"
      title="Book Instances"
    />
  );
};

export default BookInstancesList;
