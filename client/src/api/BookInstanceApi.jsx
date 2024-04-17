import axios from "axios";

export const fetchBookInstance = async (bookInstanceId) => {
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

export const fetchBookInstances = async () => {
  const response = await axios.get(
    "http://localhost:3000/catalog/bookInstances"
  );

  if (!response || response.status !== 200) {
    throw new Error("Failed to fetch book data");
  }

  return response.data.bookInstancesList;
};
