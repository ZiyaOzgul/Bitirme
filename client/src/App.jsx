import { Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import Nav from "./components/Nav";
import { useSelector } from "react-redux";
import { lightMod } from "./redux/plannerSlice/plannerSlice";
import NotePage from "./Pages/NotePage";
import PlansPage from "./Pages/PlansPage";
import ForecastPage from "./Pages/ForecastPage";
import IndexPage from "./Pages/IndexPage";

function App() {
  const theme = useSelector(lightMod);
  return (
    <div
      className={`w-full h-screen  flex items-center justify-start space-x-1 ${
        theme === "dark" ? "bg-slate-900" : "bg-white"
      }`}
    >
      <Nav />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/index" element={<IndexPage />} />
        <Route path="/notes" element={<NotePage />} />
        <Route path="/plans" element={<PlansPage />} />
        <Route path="/forecast" element={<ForecastPage />} />
      </Routes>
    </div>
  );
}

export default App;
