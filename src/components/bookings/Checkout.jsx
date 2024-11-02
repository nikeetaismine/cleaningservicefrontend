import BookingForm from "../bookings/BookingForm";
import { useEffect, useState } from "react";
import { getCleaningServiceById } from "../utils/ApiFunctions";
import CleaningServiceCarousel from "../common/CleaningServiceCarousel";
import { useParams } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";

const Checkout = () => {
  const { id } = useParams();
  const { user } = useAuth(); // Get logged-in user from AuthProvider
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [cleaningServiceInfo, setCleaningServiceInfo] = useState({
    name: "",
    description: "",
    price: "",
    photo: "",
  });

  useEffect(() => {
    if (id) {
      getCleaningServiceById(Number(id)) // Convert id to number
        .then((response) => {
          setCleaningServiceInfo(response);
          setIsLoading(false);
        })
        .catch((error) => {
          setError(error);
          setIsLoading(false);
        });
    }
  }, [id]);

  // Concatenate first and last names
  const userFullName = user ? `${user.firstName} ${user.lastName}` : "";

  return (
    <div>
      <section className="container">
        <div className="row">
          <div className="col-md-4 mt-5 mb-5">
            {isLoading ? (
              <p>Loading Cleaning Service Information...</p>
            ) : error ? (
              <p>{error.message}</p>
            ) : (
              <div className="room-info">
                <img
                  src={`data:image/png;base64,${cleaningServiceInfo.photo}`}
                  alt="Service photo"
                  style={{ width: "100%", height: "300px" }}
                />
                <table className="table table-bordered">
                  <tbody>
                    <tr>
                      <th>Name:</th>
                      <td>{cleaningServiceInfo.name}</td>
                    </tr>
                    <tr>
                      <th>Price:</th>
                      <td>KShs. {cleaningServiceInfo.price}</td>
                    </tr>
                    <tr>
                      <th>Description:</th>
                      <td>{cleaningServiceInfo.description}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>
          <div className="col-md-8">
            {/* Pass user name and email to BookingForm */}
            <BookingForm
              cleaningServiceId={id}
              userName={userFullName}
              userEmail={user ? user.email : ""}
            />
          </div>
        </div>
      </section>
      <div className="container">
        <CleaningServiceCarousel cleaningServiceId={id} />
      </div>
    </div>
  );
};

export default Checkout;
