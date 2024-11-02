import { useState } from "react";
import moment from "moment";
import Button from "react-bootstrap/Button";

const BookingSummary = ({ booking, payment, isFormValid, onConfirm }) => {
  const startDate = moment(booking.startDate);
  const endDate = moment(booking.endDate);
  const numberOfDays = endDate.diff(startDate, "days");
  const [isBookingConfirmed, setIsBookingConfirmed] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  const handleConfirmBooking = async () => {
    setIsProcessingPayment(true);
    try {
      // Call the onConfirm function to handle booking confirmation
      await onConfirm();
      setIsBookingConfirmed(true);
    } catch (error) {
      console.error("Error confirming booking:", error);
      // Handle error (optional)
    } finally {
      setIsProcessingPayment(false);
    }
  };
  return (
    <div className="row">
      <div className="col-md-6"></div>
      <div className="card card-body mt-5">
        <h4 className="card-title hotel-color">
          Scheduled Cleaning Service Summary
        </h4>
        <p>
          Name: <strong>{booking.clientFullName}</strong>
        </p>
        <p>
          Email: <strong>{booking.clientEmail}</strong>
        </p>
        <p>
          Start Date:{" "}
          <strong>{moment(booking.startDate).format("MMM Do YYYY")}</strong>
        </p>
        <p>
          End Date:{" "}
          <strong>{moment(booking.endDate).format("MMM Do YYYY")}</strong>
        </p>
        <p>
          Number of Days Booked: <strong>{numberOfDays}</strong>
        </p>

        {payment > 0 ? (
          <>
            <p>
              Total payment: <strong>Kshs. {payment}</strong>
            </p>

            {isFormValid && !isBookingConfirmed ? (
              <Button variant="success" onClick={handleConfirmBooking}>
                {isProcessingPayment ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm mr-2"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    Booking Confirmed, redirecting to payment...
                  </>
                ) : (
                  "Confirm Booking & proceed to payment"
                )}
              </Button>
            ) : isBookingConfirmed ? (
              <div className="d-flex justify-content-center align-items-center">
                <div className="spinner-border text-primary" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            ) : null}
          </>
        ) : (
          <p className="text-danger">
            Please ensure all fields are correctly filled out.
          </p>
        )}
      </div>
    </div>
  );
};

export default BookingSummary;
