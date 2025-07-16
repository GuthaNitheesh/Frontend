import { useEffect, useState } from "react";
import TaskForm from "../components/taskForm";
import TaskList from "../components/taskList";
import TaskFilters from "../components/taskFilters";
import "./TaskPage.css";
import Navbar from "../components/Navbar";

const TaskPage = ({ currUser, handleLogout }) => {
  const [list, setList] = useState([]);
  const [filtersObj, setFiltersObj] = useState({ priority: "" });
  const [isLoading, setIsLoading] = useState(true);

  const getData = async () => {
    try {
      setIsLoading(true);
      const query = [];
      if (filtersObj.priority) {
        query.push(`priority=${filtersObj.priority}`);
      }

      const resp = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/tasks?${query.join("&")}`,
        { credentials: "include" }
      );

      const respBody = await resp.json();

      if (resp.status !== 200) {
        console.warn("Failed to fetch tasks:", respBody.message);
        setList([]);
        return;
      }

      setList(respBody.data.tasks);
    } catch (err) {
      console.log("Error fetching tasks:", err.message);
    } finally {
      setIsLoading(false); // ✅ Always stop loading
    }
  };

  useEffect(() => {
    getData();
  }, [filtersObj]);

  if (isLoading) {
    return (
      <div className="loading-wrapper">
        <div className="spinner"></div>
        <p>Loading tasks...</p>
      </div>
    );
  }

  return (
    <>
      <Navbar currUser={currUser} handleLogout={handleLogout} />

      <div className="task-page-wrapper">
        <h2>Welcome to Task Management Tool!</h2>

        <div className="task-section-box">
          <TaskForm getData={getData} />
        </div>

        <div className="task-section-box">
          <TaskFilters setFiltersObj={setFiltersObj} />
        </div>

        <div className="multi-task-lists-container">
          <TaskList list={list} getData={getData} filterObj={{ status: "todo" }} title="📝 Todo List" />
          <TaskList list={list} getData={getData} filterObj={{ status: "progress" }} title="🚧 In Progress" />
          <TaskList list={list} getData={getData} filterObj={{ status: "done" }} title="✅ Done List" />
        </div>
      </div>
    </>
  );
};

export default TaskPage;
