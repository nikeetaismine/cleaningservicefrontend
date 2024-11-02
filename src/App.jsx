import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import AddService from "./components/cleaningServices/AddService";
import ExistingCleaningServices from "./components/cleaningServices/ExistingCleaningServices";
import ServiceListing from "./components/cleaningServices/ServiceListing";
import EditCleaningService from "./components/cleaningServices/EditCleaningService";
import Home from "./components/home/Home";
import NavBar from "../src/components/layout/NavBar";
import Admin from "./components/admin/Admin";
import Checkout from "./components/bookings/Checkout";
import { AuthProvider } from "./components/auth/AuthProvider";
import RequireAuth from "./components/auth/RequireAuth";
import BookingSuccess from "./components/bookings/BookingSuccess";
import Bookings from "./components/bookings/Bookings";
import FindBooking from "./components/bookings/FindBooking";
import ScheduleBooking from "./components/workers/ScheduleBooking";
import Login from "./components/auth/Login";
import Registration from "./components/auth/Registration";
import Profile from "./components/auth/Profile";
import Logout from "./components/auth/Logout";
import Worker from "./components/workers/Worker";
import ExistingWorkers from "./components/workers/ExistingWorkers";
import ExistingUsers from "./components/admin/ExistingUsers";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <AuthProvider>
      <main>
        <Router>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/edit-cleaning-service/:id"
              element={<EditCleaningService />}
            />
            <Route
              path="/existing-cleaning-services"
              element={<ExistingCleaningServices />}
            />
            <Route path="/add-cleaning-service" element={<AddService />} />
            <Route
              path="/browse-all-cleaning-services"
              element={<ServiceListing />}
            />
            <Route path="/admin" element={<Admin />} />
            <Route
              path="/book-service/:id"
              element={
                <RequireAuth>
                  <Checkout />
                </RequireAuth>
              }
            />

            <Route path="/booking-success" element={<BookingSuccess />} />
            <Route path="/existing-bookings" element={<Bookings />} />
            <Route path="/find-booking" element={<FindBooking />} />
            <Route
              path="/schedule-booking/:bookingId/:startDate/:endDate"
              element={<ScheduleBooking />}
            />

            <Route path="/worker" element={<Worker />} />
            <Route path="/existing-workers" element={<ExistingWorkers />} />
            <Route path="/existing-users" element={<ExistingUsers />} />

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Registration />} />

            <Route path="/profile" element={<Profile />} />
            <Route path="/logout" element={<Logout />} />
          </Routes>
        </Router>
      </main>
    </AuthProvider>
  );
}

export default App;
