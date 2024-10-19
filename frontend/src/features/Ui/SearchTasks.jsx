import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  searchTasks,
  setSearchKeyword,
  setTasks,
} from "../../app/Slices/darkMode/searchTasksSlice";

const SearchTasks = () => {
  const { tasks } = useSelector((state) => state.searchTacks);
  const [searchText, setSearchText] = useState("");
  const dispatch = useDispatch();
  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
    if (e.target.value === "") {
      dispatch(setTasks(tasks));
      dispatch(setSearchKeyword(""));
    }
  };
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(searchTasks(searchText));
  };
  return (
    <form className="max-w-md mx-auto" onSubmit={onSubmit}>
      <label
        htmlFor="default-search"
        className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
      >
        Search
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          type="search"
          id="default-search"
          className="block w-full p-4 ps-10 text-sm text-white  border  rounded-lg  outline-none focus:border-dark-primary bg-gray-700 border-gray-600 dark:placeholder-gray-400 dark:text-white  "
          placeholder="Search"
          value={searchText}
          onChange={handleSearchChange}
          required
        />
        <button
          type="submit"
          className="text-black absolute end-2.5 bottom-2.5 bg-dark-primary hover:bg-gray-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-dark-primary dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchTasks;
