import React, { useEffect, useState } from "react";
import axios from "axios";

export const AdminUserPage = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await axios.get(`api/v1/user/getAllUsers`);
    setUsers(response.data);
  };

  console.log(users);

  return (
    <div>
      <h2>User Management</h2>

      <button style={{}}>View Report</button>

      <br />
      <br />

      <table style={{ border: "1px solid black" }}>
        <tr style={{ border: "1px solid black" }}>
          <th style={{ border: "1px solid black" }}>First Name</th>
          <th style={{ border: "1px solid black" }}>User Email</th>
          <th style={{ border: "1px solid black" }}>Street Address</th>
          <th style={{ border: "1px solid black" }}>City</th>
          <th style={{ border: "1px solid black" }}>District</th>
        </tr>

        {users.map((user, index) => (
          <tr key={index}>
            <td style={{ border: "1px solid black" }}>{user._id}</td>
            <td style={{ border: "1px solid black" }}>{user.firstname}</td>
            <td style={{ border: "1px solid black" }}>{user.email}</td>
            <td style={{ border: "1px solid black" }}>{user.streetAddress}</td>
            <td style={{ border: "1px solid black" }}>{user.city}</td>
            <td style={{ border: "1px solid black" }}>{user.district}</td>
          </tr>
        ))}
      </table>
    </div>
  );
};
