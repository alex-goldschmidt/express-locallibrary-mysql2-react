import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import AuthorsList from "./components/AuthorsList/AuthorsList.jsx";
import BooksList from "./components/BooksList/BooksList.jsx";
import GenresList from "./components/GenresList/GenresList.jsx";
import BookInstancesList from "./components/BookInstancesList/BookInstancesList.jsx";

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
      </Routes>
    </BrowserRouter>
  );
};

export default RouteSwitch;
