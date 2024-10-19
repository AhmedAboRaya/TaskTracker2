import { useEffect, useState } from "react";
import Loader from "../Ui/Loader";
import { useDeleteTaskMutation } from "./tasksApi";

/* eslint-disable react/prop-types */
const AlertModal = ({ id }) => {
  const [deleteTask, { isLoading, isSuccess }] = useDeleteTaskMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Handlers
  const onDeleteTask = () => {
    deleteTask(id);
  };
  useEffect(() => {
    if (isSuccess) {
      setIsModalOpen(false);
    }
  }, [isSuccess]);

  return (
    <div>
      <input
        type="checkbox"
        id="alert"
        className="modal-toggle"
        checked={isModalOpen}
        onChange={(e) => setIsModalOpen(e.target.checked)}
      />
      <div className="modal fixed inset-0 flex justify-center items-start">
        <div className="modal-box mt-10 relative">
          <label
            htmlFor="alert"
            className="btn btn-sm btn-circle absolute right-2 top-2"
            onClick={() => setIsModalOpen(false)} // Close on click
          >
            ✕
          </label>
          <h3 className="text-lg font-bold">Delete Task</h3>
          <p className="py-4">Are you sure you want to delete this task?</p>
          <div className="flex space-x-3">
            <label className="btn mt-4 bg-red-500" onClick={onDeleteTask}>
              {isLoading ? <Loader /> : "Delete"}
            </label>
            <label htmlFor="alert" className="btn mt-4 bg-gray-500">
              Close!
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertModal;
