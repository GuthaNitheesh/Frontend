import { useState } from "react";
import "./taskList.css"; //ES6
import PropTypes from "prop-types";
// require("./taskList.css") // CJS

// re-render === re-run the function
const TaskList = ({ list, getData, filterObj, title }) => {
    // HW, TODO : add prop validation
    const [editTask, setEditTask] = useState(-1);
    const [editObject, setEditObject] = useState({});
    // console.log("🟡 : editObject:", editObject);
    // console.log("🟡 : editTask:", editTask); // 2

    const handleEditField = (key, value) => {
        // console.log(key, value);
        setEditObject((prev) => {
            const newObj = { ...prev };
            newObj[key] = value;
            return newObj;
        });
    };

    const handleEditData = async () => {
        const resp = await fetch(`${import.meta.env.VITE_BACKEND_URL}/tasks/${editObject._id}`, {
            method: "PATCH",
            body: JSON.stringify(editObject),
            headers: {
                "content-type": "application/json",
            },
            credentials: 'include'
        });
        const respObj = await resp.json();
        if (respObj.status === "success") {
            console.log("success :: updated");
            handleCancel();
            getData();
        } else {
            alert(respObj.message);
        }
    };

    const handleCancel = () => {
        setEditTask(-1);
        setEditObject({});
    };

    const handleDelete = async (taskId) => {
        const resp = await fetch(`${import.meta.env.VITE_BACKEND_URL}/tasks/${taskId}`, {
            method: "DELETE",
            credentials: 'include'
        });
        console.log("🟡 : resp:", resp);
        if (resp.status === 204) {
            console.log("success :: deleted");
            getData();
        } else {
            alert("Error in delete");
        }
    };

    const filteredList = list.filter((elem) => {
        if (elem.status === filterObj.status) return true;
        else return false;
    });

    const handleMarkAsDone = async (taskId) => {
        const resp = await fetch(`${import.meta.env.VITE_BACKEND_URL}/tasks/${taskId}`, {
            method: "PATCH",
            body: JSON.stringify({
                status: "done",
            }),
            headers: {
                "content-type": "application/json",
            },
            credentials: 'include'
        });
        const respObj = await resp.json();
        if (respObj.status === "success") {
            console.log("success :: updated");
            getData();
        } else {
            alert(respObj.message);
        }
    };
    const updateStatus = async (taskId, newStatus) => {
        const resp = await fetch(`${import.meta.env.VITE_BACKEND_URL}/tasks/${taskId}`, {
            method: "PATCH",
            body: JSON.stringify({ status: newStatus }),
            headers: {
                "content-type": "application/json",
            },
            credentials: "include",
        });

        const respObj = await resp.json();
        if (respObj.status === "success") {
            console.log("✅ Status updated");
            getData();
        } else {
            alert(respObj.message);
        }
    };
   return (
  <div className="task-list-main">
    <h3 className="task-list-title">{title}</h3>
    <div className="task-list-task-container">
      {filteredList.map((elem, idx) => (
        <div key={elem._id} className="task-card">
          <h5 className="task-index">#{idx + 1}</h5>
          <p className="task-work-title">{elem.workTitle}</p>
          <p className="task-task-title">{elem.taskTitle}</p>

          {idx === editTask ? (
            <div className="task-edit-assignee">
              <label>Assignee</label>
              <input
                className="task-input"
                value={editObject.assignee}
                onChange={(e) => handleEditField("assignee", e.target.value)}
              />
            </div>
          ) : (
            <p className="task-assignee">{elem.assignee}</p>
          )}

          <p className="task-assignor">{elem.assignor}</p>
          <p className="task-deadline">{elem.deadline}</p>

          {idx === editTask ? (
            <div className="task-edit-priority">
              <label>Priority</label>
              <select
                className="task-select"
                name="priority"
                value={editObject.priority}
                onChange={(e) => handleEditField("priority", e.target.value)}
              >
                <option value="normal">Normal</option>
                <option value="low">Low</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>
          ) : (
            <p className="task-priority">{elem.priority}</p>
          )}

          <p className="task-status">{elem.status}</p>

          {idx === editTask ? (
            <div className="task-edit-buttons">
              <button className="task-btn submit" onClick={handleEditData}>Submit</button>
              <button className="task-btn cancel" onClick={handleCancel}>Cancel</button>
            </div>
          ) : (
            <button className="task-btn edit" onClick={() => { setEditObject(elem); setEditTask(idx); }}>
              Edit
            </button>
          )}

          <button className="task-btn delete" onClick={() => handleDelete(elem._id)}>Delete</button>

          {/* Status Transition Buttons */}
          {elem.status === "todo" && (
            <button className="task-btn mark-progress" onClick={() => updateStatus(elem._id, "progress")}>
              Mark as In Progress
            </button>
          )}

          {elem.status === "progress" && (
            <button className="task-btn mark-done" onClick={() => updateStatus(elem._id, "done")}>
              Mark as Done
            </button>
          )}

          {elem.status === "done" && (
            <p className="task-completed">✅ Completed</p>
          )}
        </div>
      ))}
    </div>
  </div>
);
};

// https://legacy.reactjs.org/docs/typechecking-with-proptypes.html
TaskList.propTypes = {
    list: PropTypes.array,
    getData: PropTypes.func,
};

export default TaskList;