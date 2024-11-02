import { isAfter, isBefore } from "date-fns";
import { useState, useEffect } from "react";
import DateSlider from "../common/DateSlider";
import { useNavigate } from "react-router-dom";
import {
  updateBookingStatus,
  getWorkerFullNameByBookingId,
} from "../utils/ApiFunctions";

// eslint-disable-next-line react/prop-types
const BookingsTable = ({ bookingInfo, handleBookingCancellation }) => {
  const [filteredBookings, setFilteredBookings] = useState(bookingInfo);
  const [workerNames, setWorkerNames] = useState({});
  const navigate = useNavigate();

  const filterBookings = (startDate, endDate) => {
    let filtered = bookingInfo;

    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);

      filtered = bookingInfo.filter((booking) => {
        const bookingStartDate = new Date(booking.startDate);
        const bookingEndDate = new Date(booking.endDate);
        return (
          isAfter(bookingStartDate, start) && isBefore(bookingEndDate, end)
        );
      });
    }

    setFilteredBookings(filtered);
  };

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
    setFilteredBookings(bookingInfo);
  }, [bookingInfo]);

  const handleStatusUpdate = async (bookingId) => {
    try {
      console.log(`Updating status for booking ID: ${bookingId}`);
      await updateBookingStatus(bookingId); // Backend handles status update
      console.log("Status update request sent.");
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleScheduleBooking = (bookingId, startDate, endDate) => {
    navigate(`/schedule-booking/${bookingId}/${startDate}/${endDate}`);
  };

  return (
    <section className="p-4">
      <DateSlider
        onDateChange={filterBookings}
        onFilterChange={filterBookings}
      />
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

            <th colSpan={2}>Actions</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {filteredBookings.map((booking, index) => (
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

              <td>
                {booking.status === "pending scheduling" && (
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() =>
                      handleScheduleBooking(
                        booking.bookingId,
                        booking.startDate,
                        booking.endDate
                      )
                    }
                  >
                    Schedule
                  </button>
                )}
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleBookingCancellation(booking.bookingId)}
                >
                  Cancel
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {filteredBookings.length === 0 && (
        <p>No booking found for the selected dates</p>
      )}
    </section>
  );
};

export default BookingsTable;
