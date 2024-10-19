import { useDispatch, useSelector } from "react-redux";
import SearchTasks from "../Ui/SearchTasks";
import {
  togglePriority,
  toggleStatus,
  updateFilteredTasks,
} from "../../app/Slices/darkMode/searchTasksSlice";

/* eslint-disable react/prop-types */
const FiltrationComponent = ({ isDrawerOpen, toggleDrawer }) => {
  const { filtrationPriorities ,filtrationStatus  } = useSelector((state) => state.searchTacks);
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
    <div className={`drawer drawer-end ${isDrawerOpen ? "open" : ""}`}>
      <input
        id="my-drawer"
        type="checkbox"
        className="drawer-toggle"
        checked={isDrawerOpen}
        onChange={toggleDrawer}
      />
      <div className="drawer-content"></div>
      <div className="drawer-side">
        <label
          aria-label="close sidebar"
          className="drawer-overlay"
          onClick={toggleDrawer}
        ></label>
        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
          <div className="p-2 ">
            <SearchTasks />

            <div className="my-4">
              Priority
              <div className="divider"></div>
              <div className="form-control ">
                <label className="label cursor-pointer w-full">
                  <span className="label-text mr-28 font-black text-lg">
                    Low
                  </span>
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
                  <span className="label-text mr-28 font-black text-lg">
                    High
                  </span>
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
        </ul>
      </div>
    </div>
  );
};

export default FiltrationComponent;
