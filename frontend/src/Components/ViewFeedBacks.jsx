import React, { useEffect, useState } from "react";
import axios from "axios";

export const ViewFeedBacks = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/v1/feedback/getFeedBacksUser/${user.user._id}`
      );

      setFeedbacks(response.data.feedbacks);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div>
      <h3>FeedBack History</h3>

      <div
        className="feedbacks"
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        {feedbacks.map((feedback, index) => (
          <ul
            style={{
              listStyle: "none",
              margin: "15px",
              border: "1px solid gray",
              padding: "25px",
            }}
            key={index}
          >
            <li style={{ fontSize: "12px" }}>
              Product ID : {feedback.productID}
            </li>
            <li style={{ fontSize: "18px", fontWeight: "bold" }}>
              comment : {feedback.comment}
            </li>
            <li style={{ fontSize: "11px" }}>
              created date : {feedback.createdAt}
            </li>
          </ul>
        ))}
      </div>
    </div>
  );
};
