import { Outlet, useNavigation, useLocation } from "react-router";
import NavBar from "../Ui/NavBar";
import Loader from "../Ui/Loader";
import { useSelector } from "react-redux";

function AppLayout() {
  const navigation = useNavigation();
  const location = useLocation();
  const isLoading = navigation.state === "loading";
  const darkMode = useSelector((state) => state.darkMode.darkMode);

  const hideNavBarRoutes = ["/login", "/register"];
  const shouldShowNavBar = !hideNavBarRoutes.includes(location.pathname);

  return (
    <div
      className={`${
        darkMode ? "bg-dark-bg" : "bg-light-bg"
      } min-h-screen`}
    >
      {isLoading && <Loader />}
      <div className="flex justify-center">
        {shouldShowNavBar && <NavBar />}
      </div>
      <main className="">
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
