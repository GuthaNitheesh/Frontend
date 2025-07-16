import PropTypes from "prop-types";
import "./taskForm.css";
const TaskForm = ({ getData }) => {
    const addTask = async (obj) => {
        const resp = await fetch(`${import.meta.env.VITE_BACKEND_URL}/tasks`, {
            method: "POST",
            body: JSON.stringify(obj),
            headers: {
                "content-type": "application/json",
            },
            credentials: "include",
        });
        const respObj = await resp.json();
        if (respObj.status === "success") {
            console.log("success");
            getData();
        } else {
            alert(respObj.message);
        }
    };

    const handleAddTask = (e) => {
        e.preventDefault();
        if (e.target.assignee.value.length > 3) {
            // console.log(e.target.taskTitle.value);
            // console.log(e.target[1].value);
            // console.log(e.target[2].value);
            // console.log(e.target[3].value);
            // console.log(e.target.taskTitle.value);
            // console.log(e.target.assignee.value);
            // console.log(e.target.deadline.value);
            // console.log(e.target.priority.value);
            const dataObj = {
                taskTitle: e.target.taskTitle.value,
                assignee: e.target.assignee.value,
                deadline: e.target.deadline.value,
                priority: e.target.priority.value,
                assignor: "Likhilesh",
            };

            addTask(dataObj);
        } else {
            alert("Task Title and assignee is required");
        }
    };

    return (
  <div className="task-form-wrapper">
    <form className="task-form-box" onSubmit={handleAddTask}>
      <h3 className="form-heading">Create New Task</h3>

      <div className="form-group">
        <label>Task Title</label>
        <input type="text" name="taskTitle" required />
      </div>

      <div className="form-group">
        <label>Assignee</label>
        <input type="text" name="assignee" required />
      </div>

      <div className="form-group">
        <label>Deadline</label>
        <input type="datetime-local" name="deadline" />
      </div>

      <div className="form-group">
        <label>Priority</label>
        <select name="priority">
          <option value="Normal">Normal</option>
          <option value="Low">Low</option>
          <option value="High">High</option>
          <option value="Urgent">Urgent</option>
        </select>
      </div>

      <button className="task-form-btn" type="submit">Add Task</button>
    </form>
  </div>
);
};

// https://legacy.reactjs.org/docs/typechecking-with-proptypes.html
TaskForm.propTypes = {
    getData: PropTypes.func.isRequired,
};

export default TaskForm;