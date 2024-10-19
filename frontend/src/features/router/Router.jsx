import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "../login/Login";
import Register from "../register/Register";
import Home from "../home/Home";
import AppLayout from "../layout/Layout";
import Error from "../Ui/Error";
import Tasks from "../tasks/Tasks";
import Profile from "../profile/Profile";
import ProjectManagement from "../projectManagment/ProjectManagment";
import ProjectDetails from "../projectManagment/ProjectDetails";
import Missions from "../missions/Missions";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/tasks", element: <Tasks /> },
      { path: "/profile", element: <Profile /> },
      { path: "/projectManagement", element: <ProjectManagement /> },
      { path: "/projects/:id", element: <ProjectDetails />} ,
      { path: "/myMissions", element: <Missions />} ,
    ],
  },
]);

function AppRouter() {
  return <RouterProvider router={router} />;
}

export default AppRouter;
