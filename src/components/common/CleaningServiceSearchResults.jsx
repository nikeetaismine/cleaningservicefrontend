import { useState } from "react";
import ServiceCard from "../cleaningServices/ServiceCard";
import { Button, Row } from "react-bootstrap";
import CleaningServicePaginator from "./CleaningServicePaginator";

const CleaningServiceSearchResults = ({ results, onClearSearch }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 3;
  const totalResults = results.length;
  const totalPages = Math.ceil(totalResults / resultsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const startIndex = (currentPage - 1) * resultsPerPage;
  const endIndex = startIndex + resultsPerPage;
  const paginatedResults = results.slice(startIndex, endIndex);

  return (
    <>
      {results.length > 0 ? (
        <>
          <h5 className="text-center mt-5">Search Results</h5>
          <Row>
            {paginatedResults.map((cleaningService) => (
              <ServiceCard
                key={cleaningService.id}
                cleaningService={cleaningService}
              />
            ))}
          </Row>
          <Row>
            {totalResults > resultsPerPage && (
              <CleaningServicePaginator
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
            <Button variant="secondary" onClick={onClearSearch}>
              Clear Search
            </Button>
          </Row>
        </>
      ) : (
        <p></p>
      )}
    </>
  );
};

export default CleaningServiceSearchResults;
