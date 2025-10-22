import { NavLink } from "react-router-dom";

const FeedNavbar = () => {
  return (
    <header className="md:max-w-none pt-3">
      <nav className="">
        <ul className="flex justify-between px-10 md:px-0 text-lg font-medium mt-7 md:mt-0 md:mb-6">
          <li className="flex-1">
            <NavLink
              to="/feed/posts"
              className={({ isActive }) =>
                `block w-full text-center py-4 px-6 rounded-lg transition-colors duration-200 hover:bg-gray-100 hover:text-gray-800 ${
                  isActive
                    ? "bg-blue-100 text-blue-600 border-b-2 border-blue-600"
                    : ""
                }`
              }
            >
              Posts
            </NavLink>
          </li>
          <li className="flex-1">
            <NavLink
              to="/feed/media"
              className={({ isActive }) =>
                `block w-full text-center py-4 px-6 rounded-lg transition-colors duration-200 hover:bg-gray-100 hover:text-gray-800 ${
                  isActive
                    ? "bg-blue-100 text-blue-600 border-b-2 border-blue-600"
                    : ""
                }`
              }
            >
              Media
            </NavLink>
          </li>
          <li className="flex-1">
            <NavLink
              to="/feed/likes"
              className={({ isActive }) =>
                `block w-full text-center py-4 px-6 rounded-lg transition-colors duration-200 hover:bg-gray-100 hover:text-gray-800 ${
                  isActive
                    ? "bg-blue-100 text-blue-600 border-b-2 border-blue-600"
                    : ""
                }`
              }
            >
              Likes
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default FeedNavbar;
