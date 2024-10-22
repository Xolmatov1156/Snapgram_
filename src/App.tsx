import { useContext } from "react";
import "./App.css";
import { Context } from "./context/MainContext";
import RegisterRoutes from "./router/Register";
import DashboardRoutes from "./router/Dashboard";
const App = () => {
  const context = useContext(Context);
  return context?.token ? <DashboardRoutes /> : <RegisterRoutes />;
};

export default App;
