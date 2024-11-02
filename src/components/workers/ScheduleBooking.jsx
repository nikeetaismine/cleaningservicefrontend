import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../common/Header";
import {
  updateBookingStatusAndWorker,
  getAvailableWorkers,
} from "../utils/ApiFunctions";

const ScheduleBooking = () => {
  const { bookingId, startDate, endDate } = useParams();
  const [workers, setWorkers] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [noWorkersMessage, setNoWorkersMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchWorkers = async () => {
      try {
        const data = await getAvailableWorkers(startDate, endDate);
        if (data.length === 0) {
          setNoWorkersMessage("No workers available for the specified time.");
        } else {
          setNoWorkersMessage("");
        }
        setWorkers(data);
      } catch (error) {
        console.error("Error fetching workers:", error);
      }
    };

    fetchWorkers();
  }, [startDate, endDate]);

  const handleWorkerAssign = async (id) => {
    try {
      await updateBookingStatusAndWorker(bookingId, id);
      setSuccessMessage("Worker assigned successfully!");

      // Refresh bookings after a delay
      setTimeout(() => {
        setSuccessMessage("");
        navigate("/existing-bookings");
      }, 6000); // 6 seconds
    } catch (error) {
      console.error("Error assigning worker:", error);
    }
  };

  return (
    <section style={{ backgroundColor: "whitesmoke" }}>
      <Header title={"Available Workers"} />
      <div className="d-flex justify-content-between align-items-center mb-3 mt-3">
        <h2>Schedule Booking</h2>
      </div>
      {successMessage && (
        <div className="alert alert-success" role="alert">
          {successMessage}
        </div>
      )}
      <table className="table table-bordered table-hover shadow">
        <thead>
          <tr>
            <th>S/N</th>
            <th>Worker ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Schedule</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {workers.map((worker, index) => (
            <tr key={worker.id}>
              <td>{index + 1}</td>
              <td>{worker.id}</td>
              <td>{worker.firstName}</td>
              <td>{worker.lastName}</td>
              <td>{worker.email}</td>
              <td>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => handleWorkerAssign(worker.id)}
                >
                  Assign
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default ScheduleBooking;
