import MainHeader from "../layout/MainHeader";
import CleaningServices from "../common/CleaningServices";
import Parallax from "../common/Parallax";
import CleaningServiceCarousel from "../common/CleaningServiceCarousel";
import { useLocation } from "react-router-dom";

const Home = () => {
  const location = useLocation();
  const message = location.state && location.state.message;
  const currentUser = localStorage.getItem("userId");
  return (
    <section>
      {message && <p className="text-warning px-5">{message}</p>}
      {currentUser && (
        <h6 className="text-success text-center">
          You are logged-in as {currentUser}
        </h6>
      )}
      <MainHeader />
      <div className="container">
        <CleaningServiceCarousel />
        <Parallax />
        <CleaningServiceCarousel />
        <Parallax />
        <CleaningServices />
      </div>
    </section>
  );
};

export default Home;
