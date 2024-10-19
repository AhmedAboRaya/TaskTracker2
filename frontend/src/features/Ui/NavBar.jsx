import { Link, useNavigate } from "react-router-dom";
import DarkModeToggle from "./DarkModeToggle";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";
import male from "../../../public/male.svg";
import female from "../../../public/female.svg";

import "./NavBar.css";

function NavBar() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const darkMode = useSelector((state) => state.darkMode.darkMode);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    let userId = Cookies.get("userId");
    if (userId) {
      fetch(`http://localhost:5000/api/Users/${userId}`)
        .then((response) => response.json())
        .then((data) => {
          setUserData(data.user);
          setIsLoggedIn(true);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    } else {
      navigate("/login");
    }
  }, [navigate]);

  function handleLogout() {
    Cookies.remove("userId");
    setIsLoggedIn(false);
    navigate("/login");
  }

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <nav
      className={`flex justify-between p-3 items-center rounded-[35px] container mx-auto ${
        darkMode
          ? "border-dark-primary text-dark-text"
          : "border-light-primary text-light-text"
      }`}
    >
      <Link to="/">
        <h4
          className={`logo text-2xl font-medium ${
            darkMode ? "text-dark-primary" : "text-light-primary"
          }`}
        >
          TaskTrackr
        </h4>
      </Link>

      {/* Hamburger Icon for Mobile */}
      <div
        className="md:hidden flex flex-col gap-1.5 cursor-pointer"
        onClick={toggleSidebar}
      >
        <span
          className={`w-6 h-0.5 ${
            darkMode ? "bg-dark-primary" : "bg-light-primary"
          }`}
        ></span>
        <span
          className={`w-6 h-0.5 ${
            darkMode ? "bg-dark-primary" : "bg-light-primary"
          }`}
        ></span>
        <span
          className={`w-6 h-0.5 ${
            darkMode ? "bg-dark-primary" : "bg-light-primary"
          }`}
        ></span>
      </div>

      {/* Sidebar for Mobile */}
      <div
        className={`fixed top-0 left-0 h-full w-64 ${
          darkMode ? "bg-dark-bg" : "bg-light-bg"
        } z-50 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out`}
      >
        <ul className="flex flex-col gap-6 p-8 text-lg">
          {isLoggedIn && (
            <div className="flex justify-between">
              <div
                className="w-9"
                onClick={() => {
                  navigate("/profile");
                }}
              >
                <img
                  className="w-full"
                  src={userData.profileImage || male}
                  alt="User Avatar"
                />
              </div>
              <DarkModeToggle />
            </div>
          )}
          <Link
            to="/"
            className={`cursor-pointer relative ${
              darkMode ? "text-dark-primary" : "text-light-primary"
            }`}
          >
            Home
          </Link>
          <li
            className={`cursor-pointer relative ${
              darkMode ? "text-dark-primary" : "text-light-primary"
            }`}
          >
            <Link
              to="/ProjectManagement"
              className="after"
              onClick={() => {
                setSidebarOpen(false);
              }}
            >
              Project Management
            </Link>
          </li>
          <Link
            to="/tasks"
            className={`cursor-pointer relative after ${
              darkMode ? "text-dark-primary" : "text-light-primary"
            }`}
            onClick={() => {
              setSidebarOpen(false);
            }}
          >
            Tasks
          </Link>
          <Link
            to="/myMissions"
            className={`cursor-pointer relative after ${
              darkMode ? "text-dark-primary" : "text-light-primary"
            }`}
            onClick={() => {
              setSidebarOpen(false);
            }}
          >
            Missions
          </Link>
          {!isLoggedIn ? (
            <Link
              to={"/login"}
              className={`cursor-pointer rounded-lg relative ${
                darkMode ? "text-dark-primary" : "text-light-primary"
              }`}
              onClick={() => {
                setSidebarOpen(false);
              }}
            >
              login
            </Link>
          ) : (
            <li
              className={`relative ${
                darkMode ? "text-dark-primary" : "text-light-primary"
              }`}
              onClick={() => {
                handleLogout();
                setSidebarOpen(false);
              }}
            >
              <a className="after">logout</a>
            </li>
          )}
          {!isLoggedIn && (
            <div className="left">
              <DarkModeToggle />
            </div>
          )}
        </ul>
      </div>

      {/* Main Nav for Desktop */}
      <ul className="hidden md:flex gap-6 items-center text-lg font-semibold">
        <Link to="/ProjectManagement">
          <li
            className={`cursor-pointer ${
              darkMode ? "text-dark-primary" : "text-light-primary"
            }`}
          >
            Project Management
          </li>
        </Link>

        <li>
          <Link
            to="/tasks"
            className={`cursor-pointer ${
              darkMode ? "text-dark-primary" : "text-light-primary"
            }`}
          >
            Tasks
          </Link>
        </li>

        <li>
          <Link
            to="/myMissions"
            className={`cursor-pointer ${
              darkMode ? "text-dark-primary" : "text-light-primary"
            }`}
          >
            Missions
          </Link>
        </li>
        {isLoggedIn ? (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="User Avatar"
                  src={userData.gender == "male" ? male : female}
                  className="w-full"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className={`menu menu-sm dropdown-content bg-base-100 border-[1px] rounded-box z-50 mt-3 w-52 p-2 shadow ${
                darkMode
                  ? "bg-dark-bg border-dark-primary"
                  : "bg-light-bg border-light-primary"
              }`}
            >
              <li>
                <a
                  className={`justify-between ${
                    darkMode ? "text-dark-primary" : "text-light-primary"
                  }`}
                  onClick={() => {
                    navigate("/profile");
                  }}
                >
                  Profile
                </a>
              </li>
              <li onClick={() => handleLogout()}>
                <a
                  className={`${
                    darkMode ? "text-dark-primary" : "text-light-primary"
                  }`}
                >
                  logout
                </a>
              </li>
            </ul>
          </div>
        ) : (
          <Link
            to={"/login"}
            className={`cursor-pointer px-4 py-2 rounded-lg ${
              darkMode
                ? "bg-dark-primary text-light-text"
                : "bg-light-primary text-dark-text"
            }`}
          >
            login
          </Link>
        )}
        <li>
          <DarkModeToggle />
        </li>
      </ul>

      {/* Backdrop for sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40"
          onClick={toggleSidebar}
        ></div>
      )}
    </nav>
  );
}

export default NavBar;
