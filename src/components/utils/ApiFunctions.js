/* eslint-disable no-useless-catch */
import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:9192",
});
/*
export const getHeader = () => {
  const token = localStorage.getItem("token");
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
};
*/

// Function to get current user details
export const getCurrentUserDetails = async () => {
  try {
    const response = await api.get(`/users/current`);
    console.log("User Details Response:", response.data);
    return {
      id: response.data.id,
      firstName: response.data.firstname, // Correct field name from response
      lastName: response.data.lastname, // Correct field name from response
      email: response.data.email,
      roles: response.data.roles || [],
    };
  } catch (error) {
    console.error("Error fetching current user details:", error);
    throw new Error("Failed to fetch user details");
  }
};

/* This function adds a new cleaning service to database */
export async function addNewCleaningService(newCleaningService) {
  const formData = new FormData();
  formData.append("name", newCleaningService.name);
  formData.append("description", newCleaningService.description);
  formData.append("price", newCleaningService.price);
  formData.append("photo", newCleaningService.photo);

  try {
    const response = await api.post(
      "/cleaning_services/add/new-cleaning-service",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data; // Return the response data
  } catch (error) {
    console.error(
      "Error adding new cleaning service:",
      error.response || error.message
    );
    throw new Error("Error adding new cleaning service");
  }
}

/* This functions gets all cleaning services from the database */
export async function getAllCleaningServices() {
  try {
    const result = await api.get(`/cleaning_services/all-cleaning-services`);
    return result.data;
  } catch (error) {
    throw new Error("Error fetching cleaning services");
  }
}

/*This function deletes service by Id */
export async function deleteCleaningService(Id) {
  try {
    const response = await api.delete(
      `/cleaning_services/delete/cleaning-service/${Id}`
    );
    if (response.status === 204) {
      return "success";
    } else {
      throw new Error("Failed to delete cleaning service");
    }
  } catch (error) {
    throw new Error("Error deleting cleaning service ${error.message}");
  }
}

export async function updateCleaningService(Id, Data) {
  const formData = new FormData();
  formData.append("name", Data.name);
  formData.append("description", Data.description);
  formData.append("price", Data.price);
  formData.append("photo", Data.photo);

  try {
    const response = await api.put(
      `/cleaning_services/update/${Id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data; // Return the response data
  } catch (error) {
    console.error(
      "Error updating cleaning service:",
      error.response || error.message
    );
    throw new Error("Error updating cleaning service");
  }
}

/* This function gets a cleaning service by the id */
export async function getCleaningServiceById(Id) {
  try {
    const response = await api.get(`/cleaning_services/cleaningService/${Id}`);
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching cleaning service ${error.message}`);
  }
}

/* This function saves a new booking to the database */
export async function createBooking(cleaningServiceId, booking) {
  try {
    const response = await api.post(
      `/bookings/cleaning-service/${cleaningServiceId}/booking`,
      booking
    );
    // Log the response to verify what is being returned
    console.log("Backend response:", response.data);

    const bookingConfirmationCode = response.data; // Assuming the backend returns the confirmation code as plain text
    console.log("Booking confirmation code:", bookingConfirmationCode);

    return bookingConfirmationCode;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data);
    } else {
      throw new Error(`Error booking this cleaning service : ${error.message}`);
    }
  }
}

/* This function gets all bookings from the database */
export async function getAllBookings() {
  try {
    const result = await api.get(`/bookings/all-bookings`);
    if (!Array.isArray(result.data)) {
      throw new Error("Unexpected response format");
    }
    return result.data;
  } catch (error) {
    console.error("Error fetching bookings:", error.response || error.message);
    throw new Error(`Error fetching bookings: ${error.message}`);
  }
}

/* This function get booking by the confirmation code */
export async function getBookingByConfirmationCode(bookingConfirmationCode) {
  try {
    const result = await api.get(
      `/bookings/confirmation/${bookingConfirmationCode}`
    );
    return result.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data);
    } else {
      throw new Error(`Error finding booking : ${error.message}`);
    }
  }
}

/* This is the function to cancel user booking */
export async function cancelBooking(bookingId) {
  try {
    const result = await api.delete(`/bookings/booking/${bookingId}/delete`);
    return result.data;
  } catch (error) {
    throw new Error(`Error cancelling booking :${error.message}`);
  }
}

/* This function register a new user */
export async function registerUser(registration) {
  try {
    const response = await api.post("/auth/register-user", registration);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data);
    } else {
      throw new Error(`User registration error : ${error.message}`);
    }
  }
}

/* This function login a registered user */
export async function loginUser(login) {
  try {
    const response = await api.post("/auth/login", login);
    if (response.status >= 200 && response.status < 300) {
      return response.data;
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}

// Function to delete user by ID
export const deleteUser = async (email) => {
  try {
    const response = await api.delete(`/users/delete/${email}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting user:", error.message);
    throw new Error("Failed to delete user");
  }
};

// Function to get all users
export const getUsers = async () => {
  try {
    const response = await api.get("/users/all");
    console.log(response); // Ensure this endpoint returns the list of users
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error.message);
    throw new Error("Failed to fetch users");
  }
};

// Function to get user by ID
export const getUserByEmail = async (email) => {
  try {
    const response = await api.get(`/users/${email}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user:", error.message);
    throw new Error("Failed to fetch user");
  }
};

// Function to get bookings by user email
export const getBookingsByUserEmail = async (email) => {
  try {
    const response = await api.get(`bookings/user/${email}/bookings`);
    return response.data;
  } catch (error) {
    console.error("Error fetching bookings:", error.message);
    throw new Error("Failed to fetch bookings");
  }
};

// Function to get bookings by user_id
export const getBookingsByUserId = async (userId) => {
  try {
    const response = await api.get(`/bookings/user/${userId}/bookings`);
    return response.data;
  } catch (error) {
    console.error("Error fetching bookings by user ID:", error.message);
    throw new Error("Failed to fetch bookings by user ID");
  }
};

/* This function schedules a booking */
export async function updateBookingStatusAndWorker(bookingId, workerId) {
  try {
    const response = await api.put(`/bookings/${bookingId}/assign`, null, {
      params: { workerId: workerId },
    });
    return response.data;
  } catch (error) {
    throw new Error(`Error scheduling booking: ${error.message}`);
  }
}

/* This function updates the booking status */
export const updateBookingStatus = async (bookingId) => {
  try {
    const response = await api.post(`/bookings/${bookingId}/status`);
    return response.data;
  } catch (error) {
    console.error("Error updating booking status:", error);
    throw error;
  }
};

/* This function gets all workers */
export const getAllWorkers = async () => {
  try {
    const response = await api.get(`/users/role-worker`);
    return response.data;
  } catch (error) {
    console.error("Error fetching workers:", error);
    throw error;
  }
};

// This function gets available workers for a specific booking and date range
export async function getAvailableWorkers(startDate, endDate) {
  try {
    const formattedStartDate = new Date(startDate).toISOString().split("T")[0];
    const formattedEndDate = new Date(endDate).toISOString().split("T")[0];

    const response = await api.get(`/users/available-workers`, {
      params: {
        startDate: formattedStartDate,
        endDate: formattedEndDate,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching available workers: ${error.message}`);
  }
}

/* This function gets all a worker's bookings by first name */
export const getWorkerBookings = async (userId) => {
  try {
    const response = await api.get(`bookings/worker/bookings`, {
      params: { userId },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching worker bookings:", error);
    throw error;
  }
};

//This function gets the number of a worker's bookings
export const getWorkerBookingCount = async (workerId) => {
  try {
    const response = await api.get(`bookings/worker/${workerId}/booking-count`);
    return response.data;
  } catch (error) {
    console.error("Error fetching worker booking count:", error);
    throw error;
  }
};

// Function to get worker's completed bookings by worker ID
export const getWorkerCompletedBookings = async (workerId) => {
  try {
    const response = await api.get(`/bookings/worker/${workerId}/completed`);
    return response.data;
  } catch (error) {
    console.error("Error fetching completed bookings:", error);
    throw error;
  }
};

// Function to get worker's in-progress bookings by worker ID
export const getWorkerInProgressBookings = async (workerId) => {
  try {
    const response = await api.get(`/bookings/worker/${workerId}/in-progress`);
    return response.data;
  } catch (error) {
    console.error("Error fetching in-progress bookings:", error);
    throw error;
  }
};

// Function to get worker's pending bookings by worker ID
export const getWorkerPendingBookings = async (workerId) => {
  try {
    const response = await api.get(`/bookings/worker/${workerId}/scheduled`);
    return response.data;
  } catch (error) {
    console.error("Error fetching pending bookings:", error);
    throw error;
  }
};

//This function get worker name in full
export const getWorkerFullNameByBookingId = async (bookingId) => {
  try {
    const response = await api.get(`/bookings/worker-fullname`, {
      params: { bookingId },
    });
    return response.data.fullName;
  } catch (error) {
    console.error("Error fetching worker full name:", error);
    throw new Error("Failed to fetch worker full name");
  }
};

//This function adds a role to a user
export const assignUserRole = async (userId, roleId) => {
  try {
    const response = await api.post(
      `/roles/assign-user-to-role?userId=${userId}&roleId=${roleId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error assigning role:", error);
    throw new Error("Failed to assign role: " + error.message);
  }
};

// Function to fetch all roles
export const getAllRoles = async () => {
  try {
    const response = await api.get("/roles/all-roles");
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error fetching roles:", error);
    throw new Error("Failed to fetch roles: " + error.message);
  }
};

//This function removes a role from a user
export const removeUserRole = async (userId, roleId) => {
  try {
    const response = await api.post("/roles/remove-user-from-role", null, {
      params: {
        userId,
        roleId,
      },
    });
    if (response.status !== 200) {
      throw new Error("Error removing role");
    }
    return response.data;
  } catch (error) {
    console.error("Error in removeUserRole function:", error);
    throw new Error("Error removing role");
  }
};
