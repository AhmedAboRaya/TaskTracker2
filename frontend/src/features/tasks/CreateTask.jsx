import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { taskSchema } from "../../validation";
import { useEffect } from "react";
import Loader from "../Ui/Loader";
import { useCreateTaskMutation } from "./tasksApi";
import Cookies from "js-cookie";

const CreateTask = () => {
  const {
    register,
    handleSubmit,
    // reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(taskSchema),
  });
  const [createTask, { isLoading, isSuccess }] = useCreateTaskMutation();

  useEffect(() => {
    if (isSuccess) {
      document.getElementById("modal-create").checked = false;
    }
  }, [isSuccess]);
  const onSubmit = (data) => {
    const { title, description, priority } = data;
    const body = {
      title,
      description,
      priority,
      dueDate: new Date(data.dueDate).toISOString(),
      userId: Cookies.get("userId"),
    };
    createTask(body);
  };
  return (
    <div>
      <input type="checkbox" id="modal-create" className="modal-toggle" />
      <div className="modal fixed inset-0 flex justify-center items-start ">
        <div className="modal-box mt-10 relative">
          <label
            htmlFor="modal-create"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-lg font-bold">Create New Task</h3>
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
                className="w-1/2 btn mt-4 bg-dark-primary text-black"
                onClick={() => {}}
              >
                {isLoading ? <Loader /> : "Create"}
              </button>
              <label
                htmlFor="modal-create"
                className="w-1/2 btn mt-4 bg-gray-600"
              >
                Close
              </label>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateTask;
