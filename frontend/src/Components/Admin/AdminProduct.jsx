import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";
import {
  FaPlus,
  FaWindowClose,
  FaUpload,
  FaEdit,
  FaTrash,
} from "react-icons/fa";
import axios from "axios";
import Modal from "react-modal";
import Swal from "sweetalert2";
import storage from "../../../firebase/firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import "./adminStyles.css";
import "./adminCards.css";

export const AdminProduct = () => {
  const [title, setProductTitle] = useState("");
  const [price, setProductPrice] = useState("");
  const [quantity, setProductQuantity] = useState("");
  const [gender, setSelectedOption] = useState("");
  const [modalIsOpen, setIsOpen] = useState(false);
  const [editmodalIsOpen, seteditIsOpen] = useState(false);
  const [productid, setId] = useState("");
  const [imageLink, setImageLink] = useState("");
  const [file, setFile] = useState("");
  const [percent, setPercent] = useState(0);
  const [productImage, setProductImage] = useState("");

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filterGender, setFilterGender] = useState(""); // Step 1: Add filter state

  const [minPrice, setMinPrice] = useState(""); // Minimum price filter
  const [maxPrice, setMaxPrice] = useState(""); // Maximum price filter

  //Image upload file change handle
  function handleUploadChange(event) {
    setFile(event.target.files[0]);
  }

  //Add Modal----------------------------------------------------------------
  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
  }
  //End Add Modal----------------------------------------------------------------

  // Add an event handler for gender filtering
  const handleFilterChange = (e) => {
    setFilterGender(e.target.value);
  };

    // Modify the rendering logic to filter products based on price range
    const filteredData = data.filter((item) => {
      if (!filterGender) return true; // Show all products if no gender filter is selected
      return item.gender === filterGender;
    }).filter((item) => {
      if (!minPrice || !maxPrice) return true; // Show all products if no price range filters are set
      const price = parseFloat(item.price);
      return price >= minPrice && price <= maxPrice;
    });

  //Edit Modal----------------------------------------------------------------
  const openEditModal = async (id) => {
    seteditIsOpen(true);
    const response = await axios.get(
      `http://localhost:4000/api/v1/product/getOneProduct/${id}`
    );

    const product = response.data;

    if (response.data) {
      setProductTitle(product.title);
      setProductPrice(product.price);
      setProductQuantity(product.quantity);
      setProductImage(product.imageLink);
      setSelectedOption(product.gender);
      setId(product._id);
    }
  };

  function afterOpenModal() {
    subtitle.style.color = "#f00";
  }

  function closeEditModal() {
    seteditIsOpen(false);
  }

  //End Edit modal----------------------------------------------------------------

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "rgb(21, 51, 90)",
      borderRadius: "15px",
    },
  };

  const handleChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await axios.post(
      "http://localhost:4000/api/v1/product/addProduct", // Corrected URL
      {
        title,
        price,
        quantity,
        imageLink,
        gender,
      }
    );

    if (response.status == 200) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Your work has been saved",
        showConfirmButton: false,
        timer: 1500,
      });

      setProductTitle("");
      setProductPrice("");
      setProductQuantity("");
      setSelectedOption("");
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }

    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Define an async function to fetch the data
  const fetchData = async () => {
    console.log("Fetching data...");
    try {
      const response = await axios.get(
        "http://localhost:4000/api/v1/product/getAllProduct"
      );
      setData(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  console.log(data);

  const deleteProduct = async (productId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          axios
            .delete(
              `http://localhost:4000/api/v1/product/deleteProduct/${productId}`
            )
            .then(() => {
              fetchData();
              Swal.fire("Deleted!", "Your file has been deleted.", "success");
            });
        } catch (error) {
          console.error("Error deleting product:", error);
        }
      }
    });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios
        .patch(
          `http://localhost:4000/api/v1/product/editProduct/${productid}`,
          {
            title,
            price,
            quantity,
            imageLink,
            gender,
          }
        )
        .then(() => {
          fetchData();
          Swal.fire("Updated!", "Product  has been Updated.", "success");
        });
    } catch (error) {
      console.error("Error edit product:", error);
    }
  };

  //Image upload
  const handleUpload = () => {
    if (!file) {
      alert("Please upload an image first!");
    }

    const storageRef = ref(storage, `/files/${file.name}`);

    // progress can be paused and resumed. It also exposes progress updates.
    // Receives the storage reference and the file to upload.
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );

        // update progress
        setPercent(percent);
      },
      (err) => console.log(err),
      () => {
        // download url
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          console.log(url);
          setImageLink(url);
        });
      }
    );
  };

  function generatePDF(data) {
    const doc = new jsPDF();

    // Define the columns for your table
    const columns = ["Title", "Price", "Quantity", "Gender"];

    // Define the data for your table
    const tableData = data.map((item) => [
      item.title,
      `Rs.${item.price}.00`,
      item.quantity,
      item.gender,
    ]);

    // Set the table headers and data
    doc.autoTable({
      head: [columns],
      body: tableData,
    });

    // Save the PDF
    doc.save("product_report.pdf");
  }

  return (
    <div className="product">
      <h2 style={{ textAlign: "center", marginBottom: "10px" }}>
        Product Management
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
            marginBottom: "10px",
          }}
        >
          <span style={{ marginRight: "8px" }} onClick={openModal}>
            Add Product
          </span>
          <FaPlus />
        </button>
        <button
          style={{
            backgroundColor: "#007BFF", // Background color
            color: "#fff", // Text color
            borderRadius: "5px", // Border radius
            border: "none", // Remove border
            cursor: "pointer", // Cursor on hover
          }}
        >
          <span
            style={{ marginRight: "8px" }}
            onClick={() => generatePDF(data)}
          >
            Inventory Report
          </span>
          <FaPlus />
        </button>
      </div>

      <div className="filter-container">
  <label htmlFor="gender-filter" style={{color: "white"}}>Filter by Gender:</label>
  <select
    id="gender-filter"
    value={filterGender}
    onChange={handleFilterChange}
    required
    style={{
      marginLeft: '10px',
      padding: '5px',
    }}
  >
    <option value="">-- Select Gender --</option>
    <option value="mens">Men's</option>
    <option value="women">Women's</option>
  </select>
</div>

<div className="filter-container">
  <label htmlFor="min-price" style={{color: "white"}}>Min Price:</label>
  <input
    type="number"
    id="min-price"
    placeholder="Min Price"
    onChange={(e) => setMinPrice(e.target.value)}
    value={minPrice}
    style={{
      marginLeft: '10px',
      padding: '5px',
      margin: '5px 10px', // Add margin around the input
      border: '1px solid #ccc', // Add a border
    }}
  />
</div>

<div className="filter-container">
  <label htmlFor="max-price" style={{color: "white"}}>Max Price:</label>
  <input
    type="number"
    id="max-price"
    placeholder="Max Price"
    onChange={(e) => setMaxPrice(e.target.value)}
    value={maxPrice}
    style={{
      marginLeft: '10px',
      padding: '5px',
      margin: '5px 10px', // Add margin around the input
      border: '1px solid #ccc', // Add a border
    }}
  />
</div>


      <div
        className="productList"
        style={{ display: "flex", flexWrap: "wrap", margin: "10px" }}
      >
        {loading ? (
          <p>Loading</p>
        ) : (
          <>
            {filteredData.map((item, index) => (
              <div className="card-container">
                <a href="/">
                  <img
                    className="hero-image"
                    src={item.imageLink}
                    alt="Spinning glass cube"
                  />
                </a>
                <main className="main-content">
                  <h1>
                    <a href="#">{item.title}</a>
                  </h1>
                  <p>Our Equilibrium collection promotes balance and calm.</p>
                  <div className="flex-row">
                    <div className="coin-base">
                      <img
                        src="https://i.postimg.cc/T1F1K0bW/Ethereum.png"
                        alt="Ethereum"
                        className="small-image"
                      />
                      <h2>Price : Rs.{item.price}.00</h2>
                    </div>
                    <div className="time-left">
                      <img
                        src="https://i.postimg.cc/prpyV4mH/clock-selection-no-bg.png"
                        alt="clock"
                        className="small-image"
                      />
                      <p>Quantity : {item.quantity}</p>
                    </div>
                  </div>
                </main>
                <div className="card-attribute">
                  <img
                    src="https://i.postimg.cc/SQBzNQf1/image-avatar.png"
                    alt="avatar"
                    className="small-avatar"
                  />
                  <p>Gender : {item.gender}</p>
                </div>
                <button
                  style={{ backgroundColor: "blue" }}
                  onClick={() => openEditModal(item._id)}
                >
                  <FaEdit style={{ fontSize: "20px" }} />
                </button>
                <button
                  style={{ backgroundColor: "red", marginTop: "20px" }}
                  onClick={() => deleteProduct(item._id)}
                >
                  <FaTrash style={{ fontSize: "20px" }} />
                </button>
              </div>
            ))}
          </>
        )}
      </div>

      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <button
          onClick={closeModal}
          style={{ backgroundColor: "transparent", border: "none" }}
        >
          <FaWindowClose style={{ color: "white", fontSize: "40px" }} />
        </button>
        <div className="modal">
          <center>
            <label style={{ color: "white", fontSize: "30px" }}>
              Add Product
            </label>
          </center>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Enter Product Title name"
              onChange={(e) => setProductTitle(e.target.value)}
              value={title}
              required
            />{" "}
            <br />
            <input
              type="number"
              placeholder="Enter Product Price"
              onChange={(e) => setProductPrice(e.target.value)}
              value={price}
              required
            />{" "}
            <br />
            <input
              type="text"
              placeholder="Enter Product Quantity"
              onChange={(e) => setProductQuantity(e.target.value)}
              value={quantity}
              required
            />{" "}
            <br />
            <label
              style={{
                display: "inline-block",
                padding: "8px",
                border: "1px solid #ccc",
                cursor: "pointer",
                backgroundColor: "white",
                fontSize: "15px",
                color: "gray",
              }}
            >
              <input
                type="file"
                onChange={handleUploadChange}
                style={{ display: "none" }}
              />
              <FaUpload style={{ color: "gray" }} /> upload image
              <button type="button" onClick={handleUpload}>
                Upload
              </button>
              <div className="progress-bar-container">
                <div className="progress-bar" style={{ width: `${percent}%` }}>
                  {percent}% done
                </div>
              </div>
            </label>
            <br />
            <select value={gender} onChange={handleChange} required>
              <option value="">-- Select One --</option>
              <option value="mens">Men's</option>
              <option value="women">Women's</option>
            </select>
            <br />
            <center>
              <button
                style={{
                  color: "white",
                  padding: "8px",
                  width: "300px",
                  backgroundColor: "black",
                  border: "1px solid white",
                  fontSize: "15px",
                }}
              >
                Add Product
              </button>
            </center>
          </form>
        </div>
      </Modal>

      <Modal
        isOpen={editmodalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeEditModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <button
          onClick={closeEditModal}
          style={{ backgroundColor: "transparent", border: "none" }}
        >
          <FaWindowClose style={{ color: "white", fontSize: "40px" }} />
        </button>
        <div className="modal">
          <center>
            <label style={{ color: "white", fontSize: "30px" }}>
              Edit Product
            </label>
          </center>
          <form onSubmit={handleEditSubmit}>
            <input
              type="text"
              placeholder="Enter Product Title name"
              onChange={(e) => setProductTitle(e.target.value)}
              value={title}
              required
            />{" "}
            <br />
            <input
              type="number"
              placeholder="Enter Product Price"
              onChange={(e) => setProductPrice(e.target.value)}
              value={price}
              required
            />{" "}
            <br />
            <input
              type="text"
              placeholder="Enter Product Quantity"
              onChange={(e) => setProductQuantity(e.target.value)}
              value={quantity}
              required
            />{" "}
            {/* <br />
            <label
              style={{
                display: "inline-block",
                padding: "8px",
                border: "1px solid #ccc",
                cursor: "pointer",
                backgroundColor: "white",
                fontSize: "15px",
                color: "gray",
              }}
            >
              <input
                type="file"
                onChange={handleUploadChange}
                style={{ display: "none" }}
              />
              <p>{percent} "% done"</p>
              <FaUpload style={{ color: "gray" }} /> upload image
            </label>
            <button type="button">Upload</button> */}
            <br />
            <select value={gender} onChange={handleChange} required>
              <option value="">-- Select One --</option>
              <option value="mens">Men's</option>
              <option value="women">Women's</option>
            </select>
            <br />
            <center>
              <button
                style={{
                  color: "white",
                  padding: "8px",
                  width: "300px",
                  backgroundColor: "black",
                  border: "1px solid white",
                  fontSize: "15px",
                }}
              >
                Update Product
              </button>
            </center>
          </form>
        </div>
      </Modal>
    </div>
  );
};
