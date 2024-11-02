import { useState, useEffect } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { getAllCleaningServices } from "../utils/ApiFunctions";
import { setFilteredCleaningServices } from "../common/CleaningServiceFilter";
import CleaningServiceFilter from "./CleaningServiceFilter";
import CleaningServiceSearchResults from "./CleaningServiceSearchResults";

const CleaningServiceSearch = () => {
  const [searchQuery, setSearchQuery] = useState({
    serviceName: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [cleaningServices, setCleaningServices] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Fetch initial cleaning services or any necessary data on component mount
    fetchCleaningServices();
  }, []);

  const fetchCleaningServices = () => {
    // Implement your API call to fetch all cleaning services
    setIsLoading(true);
    getAllCleaningServices()
      .then((data) => {
        setCleaningServices(data);
      })
      .catch((error) => {
        console.error("Error fetching cleaning services:", error);
        setErrorMessage(
          "Error fetching cleaning services. Please try again later."
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleSearch = (e) => {
    e.preventDefault();

    // Validate search query
    if (!searchQuery.serviceName) {
      setErrorMessage("Please select a cleaning service name.");
      return;
    }

    setIsLoading(true);

    // Simulate searching/filtering cleaning services based on serviceName
    const filteredServices = cleaningServices.filter(
      (service) => service.name === searchQuery.serviceName
    );

    // Simulating delay for demonstration
    setTimeout(() => {
      setCleaningServices(filteredServices);
      setIsLoading(false);
    }, 3000);
  };

  const handleClearSearch = () => {
    setSearchQuery({
      serviceName: "",
    });
    setCleaningServices([]);
  };

  return (
    <>
      <Container className="shadow mt-n5 mb-5 py-5">
        <Form onSubmit={handleSearch}>
          <Form.Group controlId="serviceName">
            <Form.Label>Cleaning Service Name</Form.Label>

            <CleaningServiceFilter
              data={cleaningServices}
              setFilteredData={setFilteredCleaningServices}
            />
          </Form.Group>
          <Button variant="secondary" type="submit" className="mt-3">
            Search
          </Button>
        </Form>

        {isLoading ? (
          <p className="mt-4">Searching cleaning services...</p>
        ) : cleaningServices ? (
          <CleaningServiceSearchResults
            results={cleaningServices}
            onClearSearch={handleClearSearch}
          />
        ) : (
          <p className="mt-4">
            No cleaning services found for {searchQuery.serviceName}.
          </p>
        )}

        {errorMessage && <p className="text-danger">{errorMessage}</p>}
      </Container>
    </>
  );
};

export default CleaningServiceSearch;
