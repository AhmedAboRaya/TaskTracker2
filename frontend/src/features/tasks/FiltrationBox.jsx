import { useDispatch, useSelector } from "react-redux";
import SearchTasks from "../Ui/SearchTasks";
import {
  togglePriority,
  toggleStatus,
  updateFilteredTasks,
} from "../../app/Slices/darkMode/searchTasksSlice";

const FiltrationBox = () => {
  const { filtrationPriorities , filtrationStatus } = useSelector((state) => state.searchTacks);
  const dispatch = useDispatch();
  // handlers
  const onChangePriorities = (value) => {
    dispatch(togglePriority(value));
    dispatch(updateFilteredTasks());
  };
  const onChangeStatus = (value) => {
    dispatch(toggleStatus(value));
    dispatch(updateFilteredTasks());
  };
  return (
    <div className="mt-10 bg-gray-700 rounded-lg p-2 max-w-sm ">
      <div className="p-2 ">
        <SearchTasks />

        <div className="my-4">
          Priority
          <div className="divider"></div>
          <div className="form-control ">
            <label className="label cursor-pointer w-full">
              <span className="label-text mr-28 font-black text-lg">Low</span>
              <input
                type="checkbox"
                checked={filtrationPriorities.includes("low")}
                onChange={() => onChangePriorities("low")}
                className="checkbox checkbox-accent"
              />
            </label>
          </div>
          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text  font-black text-lg">Medium</span>
              <input
                type="checkbox"
                checked={filtrationPriorities.includes("medium")}
                onChange={() => onChangePriorities("medium")}
                className="checkbox checkbox-accent"
              />
            </label>
          </div>
          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text mr-28 font-black text-lg">High</span>
              <input
                type="checkbox"
                checked={filtrationPriorities.includes("high")}
                onChange={() => onChangePriorities("high")}
                className="checkbox checkbox-accent"
              />
            </label>
          </div>
        </div>
        <div className="my-4">
          Status
          <div className="divider"></div>
          <div className="form-control ">
            <label className="label cursor-pointer w-full">
              <span className="label-text mr-28 font-black text-lg">
                Completed
              </span>
              <input
                type="checkbox"
                checked={filtrationStatus.includes("completed")}
                onChange={() => onChangeStatus("completed")}
                className="checkbox checkbox-accent"
              />
            </label>
          </div>
          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text  font-black text-lg">
                In Progress
              </span>
              <input
                type="checkbox"
                checked={filtrationStatus.includes("inprogress")}
                onChange={() => onChangeStatus("inprogress")}
                className="checkbox checkbox-accent"
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FiltrationBox;
