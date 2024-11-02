import { Link } from "react-router-dom";

const Admin = () => {
  return (
    <section className="container mt-5">
      <h2>Welcome to Admin Panel</h2>
      <hr />
      <div className="d-grid gap-3">
        <Link to={"/add-cleaning-service"} className="btn btn-primary w-100">
          Add Cleaning Services
        </Link>
        <Link
          to={"/existing-cleaning-services"}
          className="btn btn-primary w-100"
        >
          Manage Cleaning Services
        </Link>
        <Link to={"/existing-bookings"} className="btn btn-primary w-100">
          Manage Bookings
        </Link>
        <Link to={"/existing-workers"} className="btn btn-primary w-100">
          View Existing Workers
        </Link>
        <Link to={"/existing-users"} className="btn btn-primary w-100">
          Manage Users
        </Link>
      </div>
    </section>
  );
};

export default Admin;
