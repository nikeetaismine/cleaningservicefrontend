import { useState, useEffect } from "react";
import moment from "moment";
import { cancelBooking, getCurrentUserDetails } from "../utils/ApiFunctions";

const MyBooking = () => {
  const [bookingInfo, setBookingInfo] = useState({
    id: "",
    bookingConfirmationCode: "",
    cleaningService: { id: "", name: "" },
    startDate: "",
    endDate: "",
    clientName: "",
    clientEmail: "",
    status: "",
  });

  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  const emptyBookingInfo = {
    id: "",
    bookingConfirmationCode: "",
    cleaningService: { id: "", name: "" },
    startDate: "",
    endDate: "",
    clientName: "",
    clientEmail: "",
    status: "",
  };

  const fetchBookingByCurrentUser = async () => {
    setIsLoading(true);

    try {
      const userDetails = await getCurrentUserDetails();
      // Assuming you have an API function to get booking by email or user details
      const data = await getBookingByConfirmationCode(
        userDetails.bookingConfirmationCode
      );
      setBookingInfo(data);
      setError(null);
    } catch (error) {
      setBookingInfo(emptyBookingInfo);
      if (error.response && error.response.status === 404) {
        setError(error.response.data.message);
      } else {
        setError(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleBookingCancellation = async () => {
    try {
      await cancelBooking(bookingInfo.id);
      setIsDeleted(true);
      setSuccessMessage("Booking has been cancelled successfully!");
      setBookingInfo(emptyBookingInfo);
      setError(null);
    } catch (error) {
      setError(error.message);
    }
    setTimeout(() => {
      setSuccessMessage("");
      setIsDeleted(false);
    }, 2000);
  };

  useEffect(() => {
    fetchBookingByCurrentUser();
  }, []);

  return (
    <>
      <div className="container mt-5 d-flex flex-column justify-content-center align-items-center">
        <h2 className="text-center mb-4">My Booking</h2>

        {isLoading ? (
          <div>Loading your booking...</div>
        ) : error ? (
          <div className="text-danger">Error: {error}</div>
        ) : bookingInfo.bookingConfirmationCode ? (
          <div className="col-md-6 mt-4 mb-5">
            <h3>Booking Information</h3>
            <p className="text-success">
              Confirmation Code: {bookingInfo.bookingConfirmationCode}
            </p>
            <p>Booking Id: {bookingInfo.id}</p>
            <p>Service Name: {bookingInfo.cleaningService.name}</p>
            <p>
              Start Date:{" "}
              {moment(bookingInfo.startDate)
                .subtract(1, "month")
                .format("MMM Do, YYYY")}
            </p>
            <p>
              End Date:{" "}
              {moment(bookingInfo.endDate)
                .subtract(1, "month")
                .format("MMM Do, YYYY")}
            </p>
            <p>Status: {bookingInfo.status}</p>

            {!isDeleted && (
              <button
                onClick={() => handleBookingCancellation(bookingInfo.id)}
                className="btn btn-danger"
              >
                Cancel Booking
              </button>
            )}
          </div>
        ) : (
          <div>No booking found for your account.</div>
        )}

        {isDeleted && (
          <div className="alert alert-success mt-3 fade show">
            {successMessage}
          </div>
        )}
      </div>
    </>
  );
};

export default MyBooking;
