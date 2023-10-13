import React, { useEffect, useState } from "react";
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
import "./adminStyles.css";

export const AdminProduct = () => {
  const [title, setProductTitle] = useState("");
  const [price, setProductPrice] = useState("");
  const [quantity, setProductQuantity] = useState("");
  const [gender, setSelectedOption] = useState("");
  const [modalIsOpen, setIsOpen] = useState(false);
  const [editmodalIsOpen, seteditIsOpen] = useState(false);
  const [productid, setId] = useState("");

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

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
      backgroundColor: "black",
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
  return (
    <div className="product">
      <h2>Product Management</h2>
      <button style={{}}>
        <span style={{ marginRight: "8px" }} onClick={openModal}>
          Add Product
        </span>
        <FaPlus />
      </button>

      <div
        className="productList"
        style={{ display: "flex", flexWrap: "wrap", margin: "10px" }}
      >
        {loading ? (
          <p>Loading</p>
        ) : (
          <>
            {data.map((item, index) => (
              <div
                key={index} // Make sure to use a unique key for each element
                className="productCard"
                style={{
                  padding: "5px",
                  margin: "10px",
                  border: "1px solid black",
                  minWidth: "300px",
                  minHeight: "200px",
                }}
              >
                <img
                  src=""
                  alt="Product Image"
                  srcset=""
                  style={{ width: "50px" }}
                />
                <h1>{item.title}</h1>
                <center>
                  <label>Price : Rs.{item.price}.00</label>
                  <p>Quantity :{item.quantity}</p>
                  <h5>Type :{item.gender}</h5>
                </center>

                <div
                  className="buttons"
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <button
                    style={{ backgroundColor: "blue" }}
                    onClick={() => openEditModal(item._id)}
                  >
                    <FaEdit style={{ fontSize: "20px" }} />
                  </button>
                  <button
                    style={{ backgroundColor: "red" }}
                    onClick={() => deleteProduct(item._id)}
                  >
                    <FaTrash style={{ fontSize: "20px" }} />
                  </button>
                </div>
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
              <input type="file" style={{ display: "none" }} />
              <FaUpload style={{ color: "gray" }} /> upload image
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
              <input type="file" style={{ display: "none" }} />
              <FaUpload style={{ color: "gray" }} /> upload image
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
    </div>
  );
};
