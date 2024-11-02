
import { useEffect, useState } from "react";

const ServiceNameSelector = () => {
  const [serviceNames, setServiceNames] = useState([]);
  const [showNewServiceNameInput, setShowNewServiceNameInput] = useState(false);
  const [newServiceName, setNewServiceName] = useState("");

  useEffect(() => {
    getServiceName()
      .then((data) => {
        setServiceNames(data);
      })
      .catch((error) => {
        console.error("Error fetching service names:", error);
      });
  }, []);

  const handleNewCleaningServiceInputChange = (e) => {
    setNewServiceName(e.target.value);
  };

  const handleAddNewServiceName = () => {
    if (newServiceName !== "") {
      setServiceNames([...serviceNames, newServiceName]);
      setNewServiceName("");
      setShowNewServiceNameInput(false);
    }
  };

  return (
    <>
      {serviceNames.length >= 0 && (
        <div className="input-group">
          <select
            id="serviceName"
            name="name"
            value={name}
            onChange={(e) => {
              if (e.target.value === "Add New") {
                setShowNewServiceNameInput(true);
              } else {
                handleAddNewServiceName(e);
              }
            }}
            className="form-control"
          >
            <option value={""}> Select the Cleaning Service Name</option>
            <option value={"Add New"}> Add New Cleaning Service</option>
            {serviceNames.map((name, index) => (
              <option key={index} value={name}>
                {name}
              </option>
            ))}
          </select>
          {showNewServiceNameInput && (
            <div className="input-group">
              <input
                className="form-control"
                type="text"
                placeholder="Enter a new Cleaning Service Name"
                onChange={handleNewCleaningServiceInputChange}
              />
              <button
                className="btn btn-hotel"
                type="button"
                onClick={handleAddNewServiceName}
              >
                Add
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ServiceNameSelector;
