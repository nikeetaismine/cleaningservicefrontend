import { useState } from "react";
import PropTypes from "prop-types";


const CleaningServiceFilter = ({ data, setFilteredData }) => {
  const [filter, setFilter] = useState("");

  const handleSelectChange = (e) => {
    const selectedCleaningServiceName = e.target.value;
    setFilter(selectedCleaningServiceName);

    const filteredCleaningServiceNames = data.filter((cleaningService) =>
      cleaningService.name
        .toLowerCase()
        .includes(selectedCleaningServiceName.toLowerCase())
    );
    setFilteredData(filteredCleaningServiceNames);
  };

  

  const cleaningServiceNames = [
    "",
    ...new Set(data.map((cleaningService) => cleaningService.name)),
  ];

  const clearFilter = () => {
    setFilter("");
    setFilteredData(data);
  };

  return (
    <div className="input-group mb-3">
      <span className="input-group-text" id="room-type-filter">
        {" "}
        Filter Cleaning services by Name
      </span>
      <select
        className="form-select"
        value={filter}
        onChange={handleSelectChange}
      >
        <option value={""}>Select a Cleaning Service Name to Filter...</option>
        {cleaningServiceNames.map((type, index) => (
          <option key={index} value={String(type)}>
            {String(type)}
          </option>
        ))}
      </select>
      <button className="btn btn-hotel" type="button" onClick={clearFilter}>
        {" "}
        Clear Filter
      </button>
    </div>
  );
};

CleaningServiceFilter.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  setFilteredData: PropTypes.func.isRequired,
};

export default CleaningServiceFilter;
