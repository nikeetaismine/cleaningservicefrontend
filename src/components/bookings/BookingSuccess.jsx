import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../common/Header";
import moment from "moment";
import { getBookingByConfirmationCode } from "../utils/ApiFunctions"; // Make sure to create this function

const BookingSuccess = () => {
  const location = useLocation();
  const [bookingInfo, setBookingInfo] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("Location State:", location.state);
    const { bookingConfirmationCode } = location.state || {};
    console.log("Booking Confirmation Code:", bookingConfirmationCode);

    if (bookingConfirmationCode) {
      const fetchBooking = async () => {
        try {
          const booking = await getBookingByConfirmationCode(
            bookingConfirmationCode
          );
          setBookingInfo(booking);
          console.log("Fetched booking data:", booking);
        } catch (error) {
          setError(error.message);
        }
      };

      fetchBooking();
    } else {
      setError("Booking information is not available.");
    }
  }, [location.state]);

  const formatDate = (dateArray) => {
    // Convert the date array [year, month, day] to a moment date and format it
    const [year, month, day] = dateArray;
    return moment([year, month - 1, day]).format("YYYY-MM-DD");
  };

  const printReceipt = () => {
    if (!bookingInfo) {
      console.error("Booking info is not available.");
      return;
    }

    const printWindow = window.open("", "", "height=600,width=800");
    printWindow.document.write("<html><head><title>Booking Receipt</title>");
    printWindow.document.write("</head><body >");
    printWindow.document.write("<h1>Booking Receipt</h1>");

    if (bookingInfo) {
      printWindow.document.write(
        "<p><strong>Confirmation Code:</strong> " +
          (bookingInfo.bookingConfirmationCode || "N/A") +
          "</p>"
      );
      printWindow.document.write(
        "<p><strong>Booking ID:</strong> " +
          (bookingInfo.bookingId || "N/A") +
          "</p>"
      );
      printWindow.document.write(
        "<p><strong>Service Name:</strong> " +
          (bookingInfo.cleaningServiceName || "N/A") +
          "</p>"
      );
      printWindow.document.write(
        "<p><strong>Start Date:</strong> " +
          (bookingInfo.startDate ? formatDate(bookingInfo.startDate) : "N/A") +
          "</p>"
      );
      printWindow.document.write(
        "<p><strong>End Date:</strong> " +
          (bookingInfo.endDate ? formatDate(bookingInfo.endDate) : "N/A") +
          "</p>"
      );
      printWindow.document.write(
        "<p><strong>Status:</strong> " + (bookingInfo.status || "N/A") + "</p>"
      );
      printWindow.document.write(
        "<p><strong>Client Name:</strong> " +
          (bookingInfo.clientFullName || "N/A") +
          "</p>"
      );
      printWindow.document.write(
        "<p><strong>Client Email:</strong> " +
          (bookingInfo.clientEmail || "N/A") +
          "</p>"
      );
      if (bookingInfo.workerName) {
        printWindow.document.write(
          "<p><strong>Worker Name:</strong> " + bookingInfo.workerName + "</p>"
        );
      }
    }
    printWindow.document.write("</body></html>");
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  return (
    <div className="container">
      <Header title="Booking Status" />
      <div className="mt-5">
        {error ? (
          <div>
            <h3 className="text-danger">Error Booking Cleaning Service!</h3>
            <p className="text-danger">{error}</p>
          </div>
        ) : bookingInfo ? (
          <div>
            <h3 className="text-success">Booking Success!</h3>
            <p className="text-success">Your booking was successful!</p>
            <button onClick={printReceipt} className="btn btn-secondary mt-3">
              Print Receipt
            </button>
          </div>
        ) : (
          <div>Loading booking details...</div>
        )}
      </div>
    </div>
  );
};

export default BookingSuccess;
