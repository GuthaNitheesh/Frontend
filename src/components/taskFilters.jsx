const TaskFilters = ({ setFiltersObj }) => {
    // DO PROP VALIDATION :: PropTypes...
    const handleFilter = (key, value) => {
        setFiltersObj((prev) => {
            const newObj = { ...prev }; // copy of object but new address
            newObj[key] = value;
            return newObj;
        });
    };
    return (
        <div>
            {/* <div>
                <input />
                <button>Search</button>
            </div> */}
            <div>
                <label>Priority</label>
                <select
                    name="priority"
                    onChange={(e) => {
                        handleFilter("priority", e.target.value);
                    }}
                >
                    <option value="">--Select--</option>
                    <option value="Normal">Normal</option>
                    <option value="Low">Low</option>
                    <option value="High">High</option>
                    <option value="Urgent">Urgent</option>
                </select>
            </div>
        </div>
    );
};

export default TaskFilters;