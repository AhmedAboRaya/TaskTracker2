/* eslint-disable react/prop-types */
import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";

const AddMissionModal = ({
  modalOpen,
  setModalOpen,
  projectId,
  reloadMission,
  setReloadMission,
}) => {
  const darkMode = useSelector((state) => state.darkMode.darkMode);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    userEmail: "",
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const creatorId = Cookies.get("userId");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/Projects/addMission",
        {
          projectId,
          title: formData.title,
          description: formData.description,
          userEmail: formData.userEmail,
          creatorId,
        }
      );

      if (response.data.success) {
        setSuccess(true);
        setFormData({ title: "", description: "", userEmail: "" });
        setTimeout(() => {
          setModalOpen(false);
          setReloadMission(!reloadMission);
        }, 800);
      }
    } catch (error) {
      console.error("Error adding mission:", error);
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Failed to add mission. Please try again.");
      }
    }
  };

  return (
    <>
      {modalOpen && (
        <dialog className={`modal ${modalOpen ? "open" : ""}`} open>
          <div
            className={`modal-box ${
              darkMode
                ? "bg-dark-bg text-dark-primary"
                : "bg-light-bg text-light-primary"
            }`}
          >
            <h2 className="font-bold text-xl">Add Mission</h2>
            {error && <p className="text-red-500">{error}</p>}
            {success && (
              <p className="text-green-500">Mission added successfully!</p>
            )}
            <form onSubmit={handleSubmit}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className={`input input-bordered w-full ${
                    darkMode
                      ? "bg-dark-bg text-dark-primary border-dark-primary"
                      : "bg-light-bg text-light-primary border-light-primary"
                  }`}
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Description</span>
                </label>
                <input
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className={`input input-bordered w-full ${
                    darkMode
                      ? "bg-dark-bg text-dark-primary border-dark-primary"
                      : "bg-light-bg text-light-primary border-light-primary"
                  }`}
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">User Email</span>
                </label>
                <input
                  type="email"
                  name="userEmail"
                  value={formData.userEmail}
                  onChange={handleChange}
                  className={`input input-bordered w-full ${
                    darkMode
                      ? "bg-dark-bg text-dark-primary border-dark-primary"
                      : "bg-light-bg text-light-primary border-light-primary"
                  }`}
                  required
                />
              </div>
              <div className="flex justify-end mt-4">
                <button
                  type="submit"
                  className={`btn mr-4 ${
                    darkMode
                      ? "bg-dark-primary text-dark-bg border-dark-primary hover:bg-dark-bg hover:text-dark-primary hover:border-dark-primary"
                      : "bg-light-primary text-light-bg border-light-primary hover:bg-light-bg hover:text-light-primary hover:border-light-primary"
                  }`}
                >
                  Add Mission
                </button>
                <button
                  type="button"
                  className={`btn  ${
                    darkMode
                      ? "bg-dark-bg text-dark-primary border-dark-primary hover:bg-dark-primary hover:text-dark-bg hover:border-dark-primary"
                      : "bg-light-bg text-light-primary border-light-primary hover:bg-light-primary hover:text-light-bg hover:border-light-primary"
                  }`}
                  onClick={() => setModalOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </dialog>
      )}
    </>
  );
};

export default AddMissionModal;
