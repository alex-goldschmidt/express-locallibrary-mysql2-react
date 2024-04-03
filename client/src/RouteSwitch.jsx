import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import AuthorsList from "./components/AuthorsList/AuthorsList.jsx";
const RouteSwitch = () => {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/authors" element={<AuthorsList />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouteSwitch;
