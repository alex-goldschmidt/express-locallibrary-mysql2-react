import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import AuthorsList from "./components/AuthorsList/AuthorsList.jsx";
import BooksList from "./components/BooksList/BooksList.jsx";

import Sidebar from "./components/Sidebar/Sidebar.jsx";
const RouteSwitch = () => {
  return (
    <BrowserRouter basename="/">
      <Sidebar />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/authors" element={<AuthorsList />} />
        <Route path="/books" element={<BooksList />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouteSwitch;
