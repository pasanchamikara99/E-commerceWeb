import React, { useEffect, useState } from "react";
import axios from "axios";
import "./adminUserStyles.css"; // Create a CSS file for styling
import jsPDF from "jspdf";
import "jspdf-autotable";
import {
  FaPlus,
  FaWindowClose,
  FaUpload,
  FaEdit,
  FaTrash,
} from "react-icons/fa";

export const AdminUserPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchData = async () => {
      console.log("Fetching data...");
      try {
        const response = await axios.get(
          "http://localhost:4000/api/v1/user/allusers"
        );
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  function generatePDF(data) {
    const doc = new jsPDF();

    // Define the columns for your table
    const columns = ["User ID", "Firstname", "Email", "User Type"];

    // Define the data for your table
    const tableData = data.map((item) => [
      item._id,
      item.firstname,
      item.email,
      item.userType,
    ]);

    // Set the table headers and data
    doc.autoTable({
      head: [columns],
      body: tableData,
    });

    // Save the PDF
    doc.save("user_report.pdf");
  }

  return (
    <div>
      <h2 style={{ textAlign: "center", marginBottom: "10px" }}>
        User Management
      </h2>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
      <button
        style={{
          backgroundColor: "#007BFF", // Background color
          color: "#fff", // Text color
          padding: "8px 16px", // Padding
          borderRadius: "5px", // Border radius
          border: "none", // Remove border
          cursor: "pointer", // Cursor on hover
        }}
      >
        <span style={{ marginRight: "8px" }} onClick={() => generatePDF(data)}>
          User Report
        </span>
        <FaPlus />
      </button>
      </div>
      <div className="containerTable">
        {loading ? (
          <p>Loading</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>User ID</th>
                <th>Firstname</th>
                <th>Email</th>
                <th>User Type</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item._id}>
                  <td>{item._id}</td>
                  <td>{item.firstname}</td>
                  <td>{item.email}</td>
                  <td>{item.userType}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
