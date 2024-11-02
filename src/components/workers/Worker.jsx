import { useEffect, useState } from "react";
import { useAuth } from "../auth/AuthProvider"; // Adjust the import path as needed
import { getWorkerBookings } from "../utils/ApiFunctions";
import Header from "../common/Header"; // Adjust the import path as needed
import WorkerBookings from "./WorkerBookings"; // Adjust the import path as needed

const Worker = () => {
  const { user } = useAuth(); // Get the logged-in user's data
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAllBookings = async () => {
      try {
        if (user && user.id) {
          console.log("User ID:", user.id);
          const data = await getWorkerBookings(user.id); // Use user.id to fetch bookings
          console.log("Fetched bookings:", data);
          setBookings(data);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllBookings();
  }, [user]);

  const handleBookingStatusChange = (bookingId) => {
    setBookings((prevBookings) =>
      prevBookings.map((booking) =>
        booking.bookingId === bookingId
          ? { ...booking, status: "Completed" } // Update status as needed
          : booking
      )
    );
  };

  if (isLoading) {
    return <p>Loading bookings...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="container">
      <Header title={"My Jobs And Orders"} />
      <div className="row">
        <div className="col-md-12">
          <WorkerBookings
            bookingInfo={bookings}
            handleBookingStatusChange={handleBookingStatusChange}
          />
        </div>
      </div>
    </div>
  );
};

export default Worker;
