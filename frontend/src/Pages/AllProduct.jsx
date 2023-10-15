import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Components/SliderImage.css";
import Navbar from "../Components/Navbar";
import { useNavigate } from "react-router-dom";

export const AllProduct = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [genderFilter, setGenderFilter] = useState("");
  const [priceFilter, setPriceFilter] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      console.log("Fetching data...");
      try {
        const response = await axios.get(
          "http://localhost:4000/api/v1/product/getAllProduct"
        );
        setData(response.data);
        setFilteredData(response.data); // Initially, set filtered data to all products
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const navigate = useNavigate();

  const clickProduct = (id) => {
    console.log("Click", id);
    navigate(`/product/${id}`);
  };

  const filterData = () => {
    let filteredProducts = data;

    if (genderFilter) {
      filteredProducts = filteredProducts.filter(
        (item) => item.gender === genderFilter
      );
    }

    if (priceFilter) {
      filteredProducts = filteredProducts.filter(
        (item) => item.price >= parseInt(priceFilter, 10)
      );
    }

    setFilteredData(filteredProducts);
  };

  return (
    <div>
      <Navbar />

      <div className="filters" style={{ width: "" }}>
        <h2>Filters</h2>
        <label>
          Gender:
          <select
            value={genderFilter}
            onChange={(e) => setGenderFilter(e.target.value)}
            style={{ padding: "5px", marginLeft: "10px" }}
          >
            <option value="">All</option>
            <option value="mens">Male</option>
            <option value="women">Female</option>
          </select>
        </label>
        <label>
          Min Price:
          <input
            type="number"
            value={priceFilter}
            onChange={(e) => setPriceFilter(e.target.value)}
            style={{ padding: "5px", marginLeft: "10px" }}
          />
        </label>
        <button
          onClick={filterData}
          style={{ backgroundColor: "black", color: "white", padding: "5px" }}
        >
          Apply Filters
        </button>
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
              <div
                key={index}
                className="productCard"
                style={{
                  padding: "5px",
                  margin: "10px",
                  minWidth: "300px",
                  minHeight: "200px",
                }}
                onClick={() => clickProduct(item._id)}
              >
                <center>
                  <img
                    src={item.imageLink}
                    alt="Product Image"
                    srcSet=""
                    style={{
                      width: "250px",
                      height: "250px",
                      objectFit: "cover",
                    }}
                  />
                  <h3>{item.title}</h3>
                  <label>Price: Rs.{item.price}</label>
                  <br />
                  <br />
                </center>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};
