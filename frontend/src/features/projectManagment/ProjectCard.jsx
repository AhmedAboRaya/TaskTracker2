/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Settings, Trash2 } from "lucide-react";
import Cookies from "js-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 

const ProjectCard = ({ project, onProjectDeleted }) => {
  const darkMode = useSelector((state) => state.darkMode.darkMode);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef(null);
  const navigate = useNavigate(); 

  const handleDelete = async () => {
    const userId = Cookies.get("userId");
    try {
      await axios.delete(
        `http://localhost:5000/api/projects/${project._id}/${userId}`
      );
      onProjectDeleted(project._id);
    } catch (error) {
      console.error(
        "Error deleting the project:",
        error.response ? error.response.data : error.message
      );
      alert("Failed to delete project. Please try again.");
    } finally {
      setIsModalOpen(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsModalOpen(false);
      }
    };

    if (isModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isModalOpen]);

  const handleNavigate = () => {
    navigate(`/projects/${project._id}`);
  };

  return (
    <div
      className={`border-2 ${
        darkMode
          ? "bg-dark-bg border-dark-primary"
          : "bg-light-bg border-light-primary"
      } shadow-md rounded-lg p-4 mb-4`}
    >
      <h2
        className={`${
          darkMode ? "text-dark-primary" : "text-light-primary"
        } text-lg font-semibold`}
      >
        {project.title}
      </h2>
      <p
        className={`${
          darkMode
            ? "text-dark-primary opacity-60"
            : "text-light-primary opacity-85"
        } mb-2`}
      >
        {project.description}
      </p>
      <div className="flex flex-row justify-between">
        <p className="text-sm text-gray-500">
          Members: {project.members.length} | Missions:{" "}
          {project.missions.length}
        </p>
        <div className="flex flex-row">
          <Settings
            className={`cursor-pointer ${
              darkMode ? "text-dark-primary" : "text-light-primary"
            } mr-2`}
            onClick={handleNavigate} 
          />
          <Trash2
            className={`text-red-500 cursor-pointer`}
            onClick={() => setIsModalOpen(true)}
          />
        </div>
      </div>

      {/* Confirmation Modal */}
      {isModalOpen && (
        <dialog id="my_modal_2" className="modal" open ref={modalRef}>
          <div
            className={`modal-box ${
              darkMode
                ? "bg-dark-bg text-dark-primary"
                : "bg-light-bg text-light-primary"
            }`}
          >
            <h3 className="font-bold text-lg">
              Are you sure you want to delete this project?
            </h3>
            <p className="py-4">This action cannot be undone.</p>
            <div className="flex justify-end">
              <button
                className={`btn mr-2 ${
                  darkMode
                    ? "bg-dark-bg text-dark-primary hover:bg-dark-primary border-dark-primary hover:border-dark-primary hover:text-dark-bg"
                    : "bg-light-bg text-light-primary hover:bg-light-primary border-light-primary hover:border-light-primary hover:text-light-bg"
                }`}
                onClick={handleDelete}
              >
                Delete
              </button>
              <button
                className={`btn ${
                  darkMode
                    ? "bg-dark-primary text-dark-bg hover:bg-dark-bg hover:border-dark-primary hover:text-dark-primary"
                    : "bg-light-primary text-light-bg hover:bg-light-bg border-light-primary hover:border-light-primary hover:text-light-primary"
                }`}
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>Close</button>
          </form>
        </dialog>
      )}
    </div>
  );
};

export default ProjectCard;
