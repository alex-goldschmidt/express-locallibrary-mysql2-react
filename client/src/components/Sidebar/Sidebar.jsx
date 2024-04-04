import { Link } from "react-router-dom";
import "./Sidebar.scss";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul className="sidebar-nav">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/books">All books</Link>
        </li>
        <li>
          <Link to="/authors">All authors</Link>
        </li>
        <li>
          <Link to="/genres">All genres</Link>
        </li>
        <li>
          <Link to="/bookInstances">All book-instances</Link>
        </li>
        <li>
          <Link to="/author/create">Create new author</Link>
        </li>
        <li>
          <Link to="/genre/create">Create new genre</Link>
        </li>
        <li>
          <Link to="/book/create">Create new book</Link>
        </li>
        <li>
          <Link to="/bookInstance/create">Create new book instance (copy)</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
