import { useEffect, useState } from "react";
import {
  deleteCleaningService,
  getAllCleaningServices,
} from "../utils/ApiFunctions";
import { Col, Row } from "react-bootstrap";
import { FaPlus, FaEdit, FaEye, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import CleaningServicePaginator from "../common/CleaningServicePaginator";
import CleaningServiceFilter from "../common/CleaningServiceFilter";

const ExistingCleaningServices = () => {
  const [cleaningServices, setCleaningServices] = useState([]);
  const [filteredCleaningServices, setFilteredCleaningServices] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [cleaningServicesPerPage] = useState(8);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchCleaningServices();
  }, []);

  const fetchCleaningServices = async () => {
    setIsLoading(true);
    try {
      const result = await getAllCleaningServices();
      setCleaningServices(result);
      setFilteredCleaningServices(result);
      setIsLoading(false);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  useEffect(() => {
    setFilteredCleaningServices(cleaningServices);
  }, [cleaningServices]);

  const handleDelete = async (id) => {
    console.log(`Attempting to delete cleaning service with ID: ${id}`);
    try {
      const result = await deleteCleaningService(id);
      console.log(`Delete result: ${result}`);
      if (result === "success") {
        setSuccessMessage(`Cleaning Service No ${id} was deleted`);
        fetchCleaningServices();
      } else {
        setErrorMessage(`Error deleting cleaning service: ${result.message}`);
      }
    } catch (error) {
      setErrorMessage(error.message);
    }

    setTimeout(() => {
      setSuccessMessage("");
      setErrorMessage("");
    }, 3000);
  };

  const calculateTotalPages = () => {
    return Math.ceil(cleaningServices.length / cleaningServicesPerPage);
  };

  const indexOfLastCleaningService = currentPage * cleaningServicesPerPage;
  const indexOfFirstCleaningService =
    indexOfLastCleaningService - cleaningServicesPerPage;
  const currentCleaningService = filteredCleaningServices.slice(
    indexOfFirstCleaningService,
    indexOfLastCleaningService
  );

  return (
    <>
      {isLoading ? (
        <p>Loading Existing Cleaning services</p>
      ) : (
        <>
          <section className="mt-5 mb-5 container">
            <div className="d-flex justify-content-center mb-3 mt-5">
              <h2>Existing Cleaning services</h2>
            </div>
            <Row>
              <Col md={6} className="mb-2 md-mb-0">
                <CleaningServiceFilter
                  data={cleaningServices}
                  setFilteredData={setFilteredCleaningServices}
                />
              </Col>

              <Col md={6} className="d-flex justify-content-end">
                <Link to={"/add-cleaning-service"}>
                  <FaPlus /> Add Service
                </Link>
              </Col>
            </Row>
            <table className="table table-bordered table-hover">
              <thead>
                <tr className="text-center">
                  <th>ID</th>
                  <th>Service Name</th>
                  <th>Service Description</th>
                  <th>Service Price</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentCleaningService.map((cleaningService) => (
                  <tr key={cleaningService.id} className="text-center">
                    <td>{cleaningService.id}</td>
                    <td>{cleaningService.name}</td>
                    <td>{cleaningService.description}</td>
                    <td>{cleaningService.price}</td>
                    <td className="gap-2">
                      <Link to={`/edit-cleaning-service/${cleaningService.id}`}>
                        <span className="btn btn-info btn-sm">
                          <FaEye />
                        </span>
                        <span className="btn btn-warning btn-sm">
                          <FaEdit />
                        </span>
                      </Link>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(cleaningService.id)}
                      >
                        <FaTrashAlt />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <CleaningServicePaginator
              currentPage={currentPage}
              totalPages={calculateTotalPages()}
              onPageChange={setCurrentPage}
            />
          </section>
        </>
      )}
    </>
  );
};

export default ExistingCleaningServices;
