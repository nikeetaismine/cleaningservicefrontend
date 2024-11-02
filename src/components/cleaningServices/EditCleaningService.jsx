import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  getCleaningServiceById,
  updateCleaningService,
} from "../utils/ApiFunctions.js";

const EditCleaningService = () => {
  const { id } = useParams();

  const [cleaningService, setCleaningService] = useState({
    name: "",
    description: "",
    price: "",
    photo: null,
  });

  const [imagePreview, setImagePreview] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setCleaningService({ ...cleaningService, photo: selectedImage });
    setImagePreview(URL.createObjectURL(selectedImage));
  };

  useEffect(() => {
    const fetchCleaningService = async () => {
      try {
        const cleaningServiceData = await getCleaningServiceById(id);
        setCleaningService(cleaningServiceData);
        if (cleaningServiceData.photo) {
          setImagePreview(`data:image/png;base64,${cleaningServiceData.photo}`);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchCleaningService();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await updateCleaningService(id, cleaningService);
      if (response) {
        setSuccessMessage("Cleaning service updated successfully!");
        const updatedServiceData = await getCleaningServiceById(id);
        setCleaningService(updatedServiceData);
        if (updatedServiceData.photo) {
          setImagePreview(`data:image/png;base64,${updatedServiceData.photo}`);
        }
        setErrorMessage("");
      } else {
        setErrorMessage("Error updating cleaning service");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage(error.message);
    }
  };

  return (
    <>
      <section className="container mt-5 mb-5">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <h2 className="mt-5 mb-2">Edit Cleaning Service</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Service Name
                </label>
                <input
                  className="form-control"
                  id="name"
                  type="text"
                  placeholder="Enter Cleaning Service Name"
                  value={cleaningService.name}
                  onChange={(e) =>
                    setCleaningService({
                      ...cleaningService,
                      name: e.target.value,
                    })
                  }
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="description" className="form-label">
                  Service Description
                </label>
                <textarea
                  className="form-control"
                  id="description"
                  name="description"
                  value={cleaningService.description}
                  onChange={(e) =>
                    setCleaningService({
                      ...cleaningService,
                      description: e.target.value,
                    })
                  }
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="price" className="form-label">
                  Service Price
                </label>
                <input
                  className="form-control"
                  id="price"
                  type="number"
                  name="price"
                  value={cleaningService.price}
                  onChange={(e) =>
                    setCleaningService({
                      ...cleaningService,
                      price: e.target.value,
                    })
                  }
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="photo" className="form-label">
                  Service Photo
                </label>
                <input
                  id="photo"
                  name="photo"
                  type="file"
                  className="form-control"
                  onChange={handleImageChange}
                />
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Preview Service Image"
                    style={{ maxWidth: "400px", maxHeight: "400px" }}
                    className="mb-3"
                  />
                )}
              </div>

              <div className="d-grid gap-2 d-md-flex mt-2">
                <Link
                  to="/existing-cleaning-services"
                  className="btn btn-outline-info ml-5"
                >
                  Back
                </Link>
                <button className="btn btn-outline-primary ml-5" type="submit">
                  Save Cleaning Service
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
      {successMessage && (
        <div className="alert alert-success mt-3">{successMessage}</div>
      )}
      {errorMessage && (
        <div className="alert alert-danger mt-3">{errorMessage}</div>
      )}
    </>
  );
};

export default EditCleaningService;
