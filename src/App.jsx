import { useState, useEffect } from "react";
import "./index.css";
import { Analytics } from "@vercel/analytics/react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import TaskDetails from "./pages/TaskDetails";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/tasks");
  }, [navigate]);

  return (
    <>
      <Routes>
        <Route path="/tasks" exact element={<Dashboard />} />
        <Route path="*" element={<Navigate to="/tasks" />} />
      </Routes>
      <Analytics />
    </>
  );
}

export default App;
