import { useState, useEffect } from "react";
import {
  getAllWorkers,
  getWorkerBookingCount,
  getWorkerCompletedBookings,
  getWorkerInProgressBookings,
  getWorkerPendingBookings,
} from "../utils/ApiFunctions.js";
import Header from "../common/Header";

const ExistingWorkers = () => {
  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bookingCounts, setBookingCounts] = useState({});

  useEffect(() => {
    const loadWorkers = async () => {
      try {
        const data = await getAllWorkers();
        console.log("Fetched workers data:", data);

        // Check the data type and content
        if (Array.isArray(data)) {
          setWorkers(data);

          // Fetch booking counts for each worker
          const counts = {};
          await Promise.all(
            data.map(async (worker) => {
              // Fetch total booking count
              const totalBookings = await getWorkerBookingCount(worker.id);

              // Fetch detailed bookings
              const completedBookings = await getWorkerCompletedBookings(
                worker.id
              );
              const inProgressBookings = await getWorkerInProgressBookings(
                worker.id
              );
              const pendingBookings = await getWorkerPendingBookings(worker.id);

              // Store counts in the counts object
              counts[worker.id] = {
                total: totalBookings, // Total bookings directly from API
                completedCount: completedBookings.length,
                inProgressCount: inProgressBookings.length,
                pendingCount: pendingBookings.length,
              };
            })
          );
          setBookingCounts(counts);
        } else {
          setError("Invalid data format");
        }
      } catch (err) {
        console.error("Error fetching workers:", err);
        setError("Error fetching workers");
      } finally {
        setLoading(false);
      }
    };

    loadWorkers();
  }, []);

  if (loading) return <p>Loading workers...</p>;
  if (error) return <p>{error}</p>;

  if (workers.length === 0) return <p>No workers found</p>;

  return (
    <section style={{ backgroundColor: "whitesmoke" }}>
      <Header title={"Existing Workers"} />
      <div className="p-4">
        <table className="table table-bordered table-hover shadow">
          <thead>
            <tr>
              <th>S/N</th>
              <th>Worker ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Total Worker Bookings</th>
              <th>Completed Bookings</th>
              <th>In Progress Bookings</th>
              <th>Pending Bookings</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {workers.map((worker, index) => (
              <tr key={worker.id}>
                <td>{index + 1}</td>
                <td>{worker.id}</td>
                <td>{worker.firstname}</td>
                <td>{worker.lastname}</td>
                <td>{worker.email}</td>
                <td>{bookingCounts[worker.id]?.total || 0}</td>
                <td>{bookingCounts[worker.id]?.completedCount || 0}</td>
                <td>{bookingCounts[worker.id]?.inProgressCount || 0}</td>
                <td>{bookingCounts[worker.id]?.pendingCount || 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default ExistingWorkers;
