import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider"; // Import the useAuth hook

const Logout = () => {
  const { logout } = useAuth(); // Use the context to get logout function
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Clear the user from the auth context
    navigate("/", { state: { message: "You have been logged out!" } });
  };

  return (
    <>
      <li>
        <Link className="dropdown-item" to={"/profile"}>
          Profile
        </Link>
      </li>
      <li>
        <hr className="dropdown-divider" />
      </li>
      <button className="dropdown-item" onClick={handleLogout}>
        Logout
      </button>
    </>
  );
};

export default Logout;
