import { useEffect, useState } from "react"
import { getAllCleaningServices } from "../utils/ApiFunctions"
import ServiceCard from "./ServiceCard"
import { Col, Container, Row } from "react-bootstrap"
import CleaningServiceFilter from "../common/CleaningServiceFilter"
import CleaningServicePaginator from "../common/CleaningServicePaginator"


const CleaningService = () => {
	const [data, setData] = useState([])
	const [error, setError] = useState(null)
	const [isLoading, setIsLoading] = useState(false)
	const [currentPage, setCurrentPage] = useState(1)
	const [cleaningServicesPerPage] = useState(6)
	const [filteredData, setFilteredData] = useState([{ id: "" }])

	useEffect(() => {
		setIsLoading(true)
		getAllCleaningServices()
			.then((data) => {
				setData(data)
				setFilteredData(data)
				setIsLoading(false)
			})
			.catch((error) => {
				setError(error.message)
				setIsLoading(false)
			})
	}, [])
	if (isLoading) {
		return <div>Loading services.....</div>
	}
	if (error) {
		return <div className=" text-danger">Error : {error}</div>
	}

	const handlePageChange = (pageNumber) => {
		setCurrentPage(pageNumber)
	}

	const totalPages = Math.ceil(filteredData.length / cleaningServicesPerPage)

	const renderCleaningServices = () => {
		const startIndex = (currentPage - 1) * cleaningServicesPerPage
		const endIndex = startIndex + cleaningServicesPerPage
		return filteredData
			.slice(startIndex, endIndex)
			.map((cleaningService) => <ServiceCard key={cleaningService.id} cleaningService={cleaningService} />)
	}

	return (
		<Container>
			<Row>
				<Col md={6} className="mb-3 mb-md-0">
					<CleaningServiceFilter data={data} setFilteredData={setFilteredData} />
				</Col>

				<Col md={6} className="d-flex align-items-center justify-content-end">
					<CleaningServicePaginator
						currentPage={currentPage}
						totalPages={totalPages}
						onPageChange={handlePageChange}
					/>
				</Col>
			</Row>

			<Row>{renderCleaningServices()}</Row>

			<Row>
				<Col md={6} className="d-flex align-items-center justify-content-end">
					<CleaningServicePaginator
						currentPage={currentPage}
						totalPages={totalPages}
						onPageChange={handlePageChange}
					/>
				</Col>
			</Row>
		</Container>
	)
}

export default CleaningService