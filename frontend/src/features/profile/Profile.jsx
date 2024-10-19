import male from "../../../public/male.svg";
import female from "../../../public/female.svg";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Loader from "../Ui/Loader";

function Profile() {
  const darkMode = useSelector((state) => state.darkMode.darkMode);
  const [userData, setUserData] = useState(null);
  const dataClassName = `p-4 rounded-xl text-2xl flex items-center gap-2 shadow`;
  useEffect(() => {
    const userId = Cookies.get("userId");

    if (userId) {
      fetch(`http://localhost:5000/api/Users/${userId}`)
        .then((response) => response.json())
        .then((data) => setUserData(data.user)) // Access the nested user object
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    } else {
      console.error("User data not found in cookies.");
    }
  }, []);

  if (!userData) {
    return <Loader />;
  }

  return (
    <section className="container mx-auto px-4">
      <div className="flex justify-center items-center">
        <div className="shadow-lg rounded-2xl gap-4 flex flex-wrap p-4 mt-4">
          <div className="w-72">
            <img
              src={`${userData.gender === "male" ? male : female}`}
              alt="img"
            />
          </div>
          <div className="mt-5 grid ">
            <h1
              className={`${dataClassName} ${
                darkMode ? "text-dark-text" : "text-light-text"
              }`}
            >
              <span
                className={`${
                  darkMode ? "text-dark-accent" : "text-light-accent"
                } font-bold`}
              >
                Name:
              </span>
              {userData.username}
            </h1>

            <p
              className={`${dataClassName} ${
                darkMode ? "text-dark-text" : "text-light-text"
              }`}
            >
              <span
                className={`${
                  darkMode ? "text-dark-accent" : "text-light-accent"
                } font-bold`}
              >
                Email:
              </span>
              {userData.email}
            </p>

            <p
              className={`${dataClassName} ${
                darkMode ? "text-dark-text" : "text-light-text"
              }`}
            >
              <span
                className={`${
                  darkMode ? "text-dark-accent" : "text-light-accent"
                } font-bold`}
              >
                gender:
              </span>
              {userData.gender}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Profile;
