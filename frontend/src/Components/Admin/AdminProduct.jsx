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
              // <div
              //   key={index} // Make sure to use a unique key for each element
              //   className="productCard"
              //   style={{
              //     padding: "5px",
              //     margin: "10px",
              //     border: "1px solid black",
              //     minWidth: "300px",
              //     minHeight: "200px",
              //   }}
              // >
              //   <img
              //     src={item.imageLink}
              //     alt="Product Image"
              //     srcset=""
              //     style={{ width: "300px", height: "300px" }}
              //   />
              //   <h1>{item.title}</h1>
              //   <center>
              //     <label>Price : Rs.{item.price}.00</label>
              //     <p>Quantity :{item.quantity}</p>
              //     <h5>Type :{item.gender}</h5>
              //   </center>

              //   <div
              //     className="buttons"
              //     style={{ display: "flex", justifyContent: "space-between" }}
              //   >
              //     <button
              //       style={{ backgroundColor: "blue" }}
              //       onClick={() => openEditModal(item._id)}
              //     >
              //       <FaEdit style={{ fontSize: "20px" }} />
              //     </button>
              //     <button
              //       style={{ backgroundColor: "red" }}
              //       onClick={() => deleteProduct(item._id)}
              //     >
              //       <FaTrash style={{ fontSize: "20px" }} />
              //     </button>
              //   </div>
              // </div>

              // <div className="container">
              //   <div className="row justify-content-center">
              //     <div className="col-12 col-sm-8 col-lg-6">
              //       {/* Section Heading */}
              //       <div
              //         className="section_heading text-center wow fadeInUp"
              //         data-wow-delay="0.2s"
              //         style={{
              //           visibility: "visible",
              //           animationDelay: "0.2s",
              //           animationName: "fadeInUp",
              //         }}
              //       >
              //         <div className="line"></div>
              //       </div>
              //     </div>
              //   </div>
              //   <div className="row">
              //     {/* Single Advisor */}
              //     <div className="col-12 col-sm-6 col-lg-3" style={{ marginRight: '50px' }}>
              //       <div
              //         className="single_advisor_profile wow fadeInUp"
              //         data-wow-delay="0.2s"
              //         style={{
              //           visibility: "visible",
              //           animationDelay: "0.2s",
              //           animationName: "fadeInUp",
              //         }}
              //       >
              //         {/* Team Thumb */}
              //         <div className="advisor_thumb">
              //           <img
              //             src={item.imageLink}
              //             alt=""
              //             style={{ width: "300px", height: "300px" }}
              //           />
              //           {/* Social Info */}
              //           <div className="social-info">
              //             <a href="#">
              //               <i className="fa fa-facebook"></i>
              //             </a>
              //             <a href="#">
              //               <i className="fa fa-twitter"></i>
              //             </a>
              //             <a href="#">
              //               <i className="fa fa-linkedin"></i>
              //             </a>
              //           </div>
              //         </div>
              //         {/* Team Details */}
              //         <div className="single_advisor_details_info">
              //           <h6>{item.title}</h6>
              //           <p className="designation">
              //             Price : Rs.{item.price}.00
              //           </p>
              //           <h5>Quantity : {item.quantity}</h5>
              //           <h5>Gender : {item.gender}</h5>
              //           <button
              //             style={{ backgroundColor: "blue" }}
              //             onClick={() => openEditModal(item._id)}
              //           >
              //             <FaEdit style={{ fontSize: "20px" }} />
              //           </button>
              //           <button
              //             style={{ backgroundColor: "red" }}
              //             onClick={() => deleteProduct(item._id)}
              //           >
              //             <FaTrash style={{ fontSize: "20px" }} />
              //           </button>
              //         </div>
              //       </div>
              //     </div>
              //   </div>
              // </div>

              <div className="card-container">
              <a href="/" className="hero-image-container">
                <img className="hero-image" src={item.imageLink} alt="Spinning glass cube" />
              </a>
              <main className="main-content">
                <h1><a href="#">{item.title}</a></h1>
                <p>Our Equilibrium collection promotes balance and calm.</p>
                <div className="flex-row">
                  <div className="coin-base">
                    <img src="https://i.postimg.cc/T1F1K0bW/Ethereum.png" alt="Ethereum" className="small-image" />
                    <h2>Price : Rs.{item.price}.00</h2>
                  </div>
                  <div className="time-left">
                    <img src="https://i.postimg.cc/prpyV4mH/clock-selection-no-bg.png" alt="clock" className="small-image" />
                    <p>Quantity : {item.quantity}</p>
                  </div>
                </div>
              </main>
              <div className="card-attribute">
                <img src="https://i.postimg.cc/SQBzNQf1/image-avatar.png" alt="avatar" className="small-avatar" />
                <p>Gender : {item.gender}</p>
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
              <input
                type="file"
                onChange={handleUploadChange}
                style={{ display: "none" }}
              />
              <FaUpload style={{ color: "gray" }} /> upload image
              <button type="button" onClick={handleUpload}>
                Upload
              </button>
              <p>{percent} "% done"</p>
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
