import { useState, useEffect } from "react";
import {
  updateBookingStatus,
  getWorkerFullNameByBookingId,
} from "../utils/ApiFunctions";

// eslint-disable-next-line react/prop-types
const WorkerBookings = ({ bookingInfo = [], handleBookingStatusChange }) => {
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [workerNames, setWorkerNames] = useState({});

  useEffect(() => {
    const fetchWorkerNames = async () => {
      try {
        const names = {};
        for (const booking of bookingInfo) {
          if (booking.workerId) {
            const workerName = await getWorkerFullNameByBookingId(
              booking.bookingId
            );
            names[booking.bookingId] = workerName;
          } else {
            names[booking.bookingId] = "Unassigned";
          }
        }
        setWorkerNames(names);
      } catch (error) {
        console.error("Error fetching worker names:", error);
      }
    };

    fetchWorkerNames();
  }, [bookingInfo]);

  useEffect(() => {
    console.log("bookingInfo:", bookingInfo);
    if (Array.isArray(bookingInfo)) {
      setFilteredBookings(bookingInfo);
    } else {
      console.error("bookingInfo is not an array:", bookingInfo);
    }
  }, [bookingInfo]);

  const handleStatusUpdate = async (bookingId) => {
    try {
      await updateBookingStatus(bookingId); // Backend handles status update
      handleBookingStatusChange(bookingId); // Update status in parent component
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
    <section className="p-4">
      <table className="table table-bordered table-hover shadow">
        <thead>
          <tr>
            <th>S/N</th>
            <th>Booking ID</th>
            <th>Confirmation Code</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Status</th>
            <th>Cleaning Service</th>
            <th>Client</th>
            <th>Client Email</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {filteredBookings.length > 0 ? (
            filteredBookings.map((booking, index) => (
              <tr key={booking.bookingId}>
                <td>{index + 1}</td>
                <td>{booking.bookingId}</td>
                <td>{booking.bookingConfirmationCode}</td>
                <td>{booking.startDate}</td>
                <td>{booking.endDate}</td>
                <td>
                  {booking.status}
                  <button
                    className="btn btn-success btn-sm"
                    onClick={() => handleStatusUpdate(booking.bookingId)}
                  >
                    Update Status
                  </button>
                </td>
                <td>{booking.cleaningServiceName}</td>
                <td>{booking.clientFullName}</td>
                <td>{booking.clientEmail}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9">No bookings found </td>
            </tr>
          )}
        </tbody>
      </table>
    </section>
  );
};

export default WorkerBookings;
