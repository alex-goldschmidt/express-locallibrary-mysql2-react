import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import AuthorsList from "./components/AuthorsList/AuthorsList.jsx";
import BooksList from "./components/BooksList/BooksList.jsx";
import GenresList from "./components/GenresList/GenresList.jsx";
import BookInstancesList from "./components/BookInstancesList/BookInstancesList.jsx";
import GenreDetail from "./components/GenreDetail/GenreDetail.jsx";
import AuthorDetail from "./components/AuthorDetail/AuthorDetail.jsx";
import BookDetail from "./components/BookDetail/BookDetail.jsx";
import BookInstanceDetail from "./components/BookInstanceDetail/BookInstanceDetail.jsx";

import Sidebar from "./components/Sidebar/Sidebar.jsx";

const RouteSwitch = () => {
  return (
    <BrowserRouter basename="/">
      <Sidebar />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/authors" element={<AuthorsList />} />
        <Route path="/books" element={<BooksList />} />
        <Route path="/genres" element={<GenresList />} />
        <Route path="/bookInstances" element={<BookInstancesList />} />
        <Route path="/genre/:genreId" element={<GenreDetail />} />
        <Route path="/author/:authorId" element={<AuthorDetail />} />
        <Route path="/book/:bookId" element={<BookDetail />} />
        <Route
          path="/bookInstance/:bookInstanceId"
          element={<BookInstanceDetail />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default RouteSwitch;
