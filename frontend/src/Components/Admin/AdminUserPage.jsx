import React from "react";

export const AdminUserPage = () => {
  return (
    <div>
      <h2>User Management</h2>

      <button style={{}}>Add User</button>

      <br />

      <table style={{ border: "1px solid black" }}>
        <tr>
          <th>User ID</th>
          <th>User Name</th>
          <th>User Email</th>
          <th>Action</th>
        </tr>
      </table>
    </div>
  );
};
