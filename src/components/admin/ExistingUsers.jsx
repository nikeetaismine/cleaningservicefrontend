import { useState, useEffect } from "react";
import {
  getUsers,
  deleteUser,
  assignUserRole,
  removeUserRole,
  getAllRoles,
} from "../utils/ApiFunctions.js";
import Header from "../common/Header";

const ExistingUsers = () => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [selectedRoleToAssign, setSelectedRoleToAssign] = useState({});
  const [selectedRoleToRemove, setSelectedRoleToRemove] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch users when the component mounts
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await getUsers();
        console.log("Fetched users:", usersData);
        if (Array.isArray(usersData)) {
          setUsers(usersData);
        } else {
          console.error("API did not return an array");
          setUsers([]); // Set to an empty array to avoid errors
        }
      } catch (error) {
        console.error("Error fetching users:", error);
        setError("Error fetching users");
      }
    };

    const fetchRoles = async () => {
      try {
        const rolesData = await getAllRoles();
        console.log("Fetched roles:", rolesData);
        if (Array.isArray(rolesData)) {
          setRoles(rolesData);
          console.log("Roles available:", roles);
        } else {
          console.error("API did not return an array");
          setRoles([]); // Set to an empty array to avoid errors
        }
      } catch (error) {
        console.error("Error fetching roles:", error);
        setError("Error fetching roles");
      }
    };

    // Fetch both users and roles, then set loading to false
    const fetchData = async () => {
      await Promise.all([fetchUsers(), fetchRoles()]);
      setLoading(false);
    };

    fetchData();
  }, []);

  // Handle user deletion
  const handleDelete = async (email) => {
    try {
      await deleteUser(email);
      setUsers(users.filter((user) => user.email !== email)); // Remove deleted user from state
    } catch (error) {
      console.error("Error deleting user:", error);
      setError("Error deleting user");
    }
  };

  // Handle assigning a new role
  const handleAssignRole = async (userId, roleId) => {
    try {
      const roleIdAsInt = parseInt(roleId, 10);
      console.log("Assigning role with ID:", roleIdAsInt);
      console.log("Roles available:", roles);

      await assignUserRole(userId, roleIdAsInt);
      const roleName = roles.find((role) => role.id === roleIdAsInt)?.name;
      console.log("Role name found:", roleName);
      if (!roleName) {
        console.error("Role name not found for ID: ", roleIdAsInt);
        return;
      }
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId
            ? { ...user, roles: [...user.roles, roleName] }
            : user
        )
      );
      // Clear the selected role after assignment
      setSelectedRoleToAssign((prev) => ({ ...prev, [userId]: "" }));
    } catch (error) {
      console.error("Error assigning role:", error);
      setError("Error assigning role");
    }
  };

  // Handle removing a role
  const handleRemoveRole = async (userId, roleId) => {
    try {
      await removeUserRole(userId, roleId);
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId
            ? {
                ...user,
                roles: user.roles.filter(
                  (role) =>
                    role !== roles.find((role) => role.id === roleId)?.name
                ),
              }
            : user
        )
      );
      // Clear the selected role after removal
      setSelectedRoleToRemove((prev) => ({ ...prev, [userId]: "" }));
    } catch (error) {
      console.error("Error removing role:", error);
      setError("Error removing role");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  if (users.length === 0) return <p>No users found</p>;

  return (
    <section style={{ backgroundColor: "whitesmoke" }}>
      <Header title={"Existing Users"} />
      <div className="p-4">
        <table className="table table-bordered table-hover shadow">
          <thead>
            <tr>
              <th>User ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Roles</th>
              <th>Delete User</th>
              <th>Assign New Role</th>
              <th>Remove Role</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {users.map((user) => (
              <tr key={user.email}>
                <td>{user.id}</td>
                <td>{user.firstname}</td>
                <td>{user.lastname}</td>
                <td>{user.email}</td>
                <td>{user.roles.join(", ")}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(user.email)}
                  >
                    Delete User
                  </button>
                </td>
                <td>
                  <select
                    onChange={(e) => handleAssignRole(user.id, e.target.value)}
                    value={selectedRoleToAssign[user.id] || ""}
                  >
                    <option value="" disabled>
                      Select a role
                    </option>
                    {roles.map((role) => (
                      <option key={role.id} value={role.id}>
                        {role.name}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  <select
                    onChange={(e) =>
                      handleRemoveRole(user.id, parseInt(e.target.value))
                    }
                    value={selectedRoleToRemove[user.id] || ""}
                  >
                    <option value="" disabled>
                      Select a role to remove
                    </option>
                    {user.roles.map((role, index) => (
                      <option
                        key={index}
                        value={roles.find((r) => r.name === role)?.id}
                      >
                        {role}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default ExistingUsers;
