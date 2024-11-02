import { useEffect, useState } from "react";
import moment from "moment";
import { Form, FormControl } from "react-bootstrap";
import BookingSummary from "./BookingSummary";
import { createBooking, getCleaningServiceById } from "../utils/ApiFunctions";
import { useNavigate } from "react-router-dom";

const BookingForm = ({ cleaningServiceId, userName, userEmail }) => {
  const [validated, setValidated] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [cleaningServicePrice, setCleaningServicePrice] = useState(0);

  const [formData, setFormData] = useState({
    name: userName || "",
    email: userEmail || "",
    cleaningServiceId: cleaningServiceId || "",
  });

  const [booking, setBooking] = useState({
    clientFullName: userName || "",
    clientEmail: userEmail || "",
    startDate: "",
    endDate: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      if (cleaningServiceId) {
        await getCleaningServicePriceById(cleaningServiceId);
      }
    };

    fetchData();
  }, [cleaningServiceId]);

  useEffect(() => {
    // Update booking details with user data
    setBooking((prevBooking) => ({
      ...prevBooking,
      clientFullName: userName || "",
      clientEmail: userEmail || "",
    }));
  }, [userName, userEmail]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBooking((prevBooking) => ({
      ...prevBooking,
      [name]: value,
    }));
  };

  const getCleaningServicePriceById = async (id) => {
    try {
      const response = await getCleaningServiceById(id);
      setCleaningServicePrice(response.price);
    } catch (error) {
      setErrorMessage("Error fetching cleaning service price");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      setIsSubmitted(true);
    }
    setValidated(true);
  };

  const handleFormSubmit = async () => {
    try {
      const bookingConfirmationCode = await createBooking(
        cleaningServiceId,
        booking
      );
      console.log("Confirmation Code Received: ", bookingConfirmationCode);
      setIsSubmitted(true);
      console.log(
        "Navigating to BookingSuccess with code:",
        bookingConfirmationCode
      );

      navigate("/booking-success", {
        state: {
          bookingConfirmationCode,
          bookingInfo: booking,
        },
      });
    } catch (error) {
      setErrorMessage(error.message);
      navigate("/booking-success", { state: { error: error.message } });
    }
  };

  return (
    <>
      <div className="container mb-5">
        <div className="row">
          <div className="col-md-6">
            <div className="card card-body mt-5">
              <h4 className="card-title">Schedule A Cleaning Service</h4>

              {errorMessage && <p className="text-danger">{errorMessage}</p>}

              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group>
                  <Form.Label htmlFor="clientFullName" className="hotel-color">
                    Full Name
                  </Form.Label>
                  <FormControl
                    required
                    type="text"
                    id="clientFullName"
                    name="clientFullName"
                    value={booking.clientFullName}
                    onChange={handleInputChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter your Full Name.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group>
                  <Form.Label htmlFor="clientEmail" className="hotel-color">
                    Email
                  </Form.Label>
                  <FormControl
                    required
                    type="email"
                    id="clientEmail"
                    name="clientEmail"
                    value={booking.clientEmail}
                    onChange={handleInputChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter a valid email address.
                  </Form.Control.Feedback>
                </Form.Group>

                <fieldset style={{ border: "2px" }}>
                  <legend>Expected Service Period</legend>
                  <div className="row">
                    <div className="col-6">
                      <Form.Label htmlFor="startDate" className="hotel-color">
                        Start date
                      </Form.Label>
                      <FormControl
                        required
                        type="date"
                        id="startDate"
                        name="startDate"
                        value={booking.startDate}
                        placeholder="start-date"
                        min={moment().format("YYYY-MM-DD")}
                        onChange={handleInputChange}
                      />
                      <Form.Control.Feedback type="invalid">
                        Please select a start date.
                      </Form.Control.Feedback>
                    </div>
                    <div className="col-6">
                      <Form.Label htmlFor="endDate" className="hotel-color">
                        End date
                      </Form.Label>
                      <FormControl
                        required
                        type="date"
                        id="endDate"
                        name="endDate"
                        value={booking.endDate}
                        placeholder="end-date"
                        min={moment().format("YYYY-MM-DD")}
                        onChange={handleInputChange}
                      />
                      <Form.Control.Feedback type="invalid">
                        Please select an end date.
                      </Form.Control.Feedback>
                    </div>
                    {errorMessage && (
                      <p className="error-message text-danger">
                        {errorMessage}
                      </p>
                    )}
                  </div>
                </fieldset>

                <div className="form-group mt-2 mb-2">
                  <button type="submit" className="btn btn-hotel">
                    Continue
                  </button>
                </div>
              </Form>
            </div>
          </div>

          <div className="col-md-4">
            {isSubmitted && (
              <BookingSummary
                booking={booking}
                payment={cleaningServicePrice}
                onConfirm={handleFormSubmit}
                isFormValid={validated}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default BookingForm;
