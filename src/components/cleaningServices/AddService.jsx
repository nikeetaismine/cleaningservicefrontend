import { useState } from "react";
import { addNewCleaningService } from "../utils/ApiFunctions";

const AddService = () => {
  const [newCleaningService, setNewCleaningService] = useState({
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
    setNewCleaningService({ ...newCleaningService, photo: selectedImage });
    setImagePreview(URL.createObjectURL(selectedImage));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const success = await addNewCleaningService(newCleaningService);
      if (success) {
        setSuccessMessage("A new cleaning service was added to the database");
        setNewCleaningService({
          name: "",
          description: "",
          price: "",
          photo: null,
        });
        setImagePreview("");
        setErrorMessage("");
      } else {
        setErrorMessage("Error adding cleaning service");
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <>
      <section className="container mt-5 mb-5">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <h2 className="mt-5 mb-2">Add a New Cleaning Service</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Service Name
                </label>
                <input
                  className="form-control"
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter a new Cleaning Service Name"
                  value={newCleaningService.name}
                  onChange={(e) =>
                    setNewCleaningService({
                      ...newCleaningService,
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
                  value={newCleaningService.description}
                  onChange={(e) =>
                    setNewCleaningService({
                      ...newCleaningService,
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
                  value={newCleaningService.price}
                  onChange={(e) =>
                    setNewCleaningService({
                      ...newCleaningService,
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
                  required
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

              <div className="d-grid d-md-flex mt-2">
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

export default AddService;
