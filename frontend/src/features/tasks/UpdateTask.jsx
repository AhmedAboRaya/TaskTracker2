/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { taskSchema } from "../../validation";
import { useEffect } from "react";
import { useUpdateTaskMutation } from "./tasksApi";
import Loader from "../Ui/Loader";
const UpdateTask = ({ taskEdit }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(taskSchema),
  });
  useEffect(() => {
    if (taskEdit) {
      reset({
        title: taskEdit.title,
        description: taskEdit.description,
        priority: taskEdit.priority,
        dueDate: taskEdit.dueDate.slice(0, 10),
      });
    }
  }, [taskEdit, reset]);
  const [updateTask, { isLoading, isSuccess }] = useUpdateTaskMutation();
  useEffect(() => {
    if (isSuccess) {
      document.getElementById("modal-update").checked = false;
    }
  }, [isSuccess]);
  const onSubmit = (data) => {
    const { title, description, priority } = data;
    updateTask({
      id: taskEdit.id,
      body: {
        title,
        description,
        priority,
        dueDate: new Date(data.dueDate).toISOString(),
      },
    });
  };
  return (
    <div>
      <input type="checkbox" id="modal-update" className="modal-toggle" />
      <div className="modal fixed inset-0 flex justify-center items-start ">
        <div className="modal-box mt-10 relative">
          <label
            htmlFor="modal-update"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-lg font-bold">Update Task</h3>
          <form
            className="flex flex-col space-y-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div>
              <div className="label">
                <span className="label-text">Task Title</span>
              </div>
              <input
                type="text"
                placeholder="Enter Task Title"
                className="input input-bordered w-full "
                {...register("title")}
              />
              {errors?.title && (
                <p className="text-red-500 text-xs ">{errors.title.message}</p>
              )}
            </div>
            <div>
              <div className="label">
                <span className="label-text">Task Priority</span>
              </div>
              <select
                className="select select-bordered w-full "
                {...register("priority")}
              >
                <option value={""} disabled>
                  Task Priority
                </option>
                <option value={"low"}>Low</option>
                <option value={"medium"}> Medium</option>
                <option value={"high"}>High</option>
              </select>
              {errors?.priority && (
                <p className="text-red-500 text-xs ">
                  {errors.priority.message}
                </p>
              )}
            </div>
            <div>
              <div className="label">
                <span className="label-text">Task Due Date</span>
              </div>
              <input
                type="date"
                placeholder="Enter Task Date"
                className="input input-bordered w-full "
                {...register("dueDate")}
              />
              {errors?.dueDate && (
                <p className="text-red-500 text-xs ">
                  {errors.dueDate.message}
                </p>
              )}
            </div>
            <div>
              <div className="label">
                <span className="label-text">Task Description</span>
              </div>
              <textarea
                placeholder="Enter Task Description"
                className="textarea textarea-bordered w-full "
                {...register("description")}
              />
              {errors?.description && (
                <p className="text-red-500 text-xs ">
                  {errors.description.message}
                </p>
              )}
            </div>
            <div className="flex justify-between space-x-3">
              <button
                className="w-1/2 btn mt-4 bg-indigo-600"
                onClick={() => {}}
              >
                {isLoading ? <Loader /> : "Update"}
              </button>
              <label
                htmlFor="modal-update"
                className="w-1/2 btn mt-4 bg-gray-500"
              >
                Close!
              </label>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateTask;
