import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export const FeedBack = () => {
  const [comment, setComment] = useState("");
  const [feedbacks, setFeedbacks] = useState([]);
  const [add, setAdd] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));
  const { id } = useParams();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/v1/feedback/getFeedBacks/${id}`
      );

      console.log(response.data);
      setFeedbacks(response.data.feedbacks);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await axios.post(
      `http://localhost:4000/api/v1/feedback/addFeedback`,
      {
        productID: id,
        userID: user.user._id,
        userName: user.user.firstname,
        comment,
      }
    );
  };

  return (
    <div>
      <div className="ratings" style={{ margin: "0 10rem" }}>
        <p
          style={{
            width: "100%",
            backgroundColor: "black",
            color: "white",
            padding: "5px 25px ",
          }}
        >
          FeedBacks
        </p>

        <div
          className="items"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <div className="rating" style={{ width: "60%", padding: "5px" }}>
            {feedbacks.map((feedback) => (
              <ol
                style={{
                  listStyle: "none",
                  padding: "10px",
                  maxWidth: "500px",
                }}
              >
                <li style={{ fontSize: "13px" }}>{feedback.userName}</li>
                <li
                  style={{
                    maxWidth: "500px",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                    fontSize: "16px",
                  }}
                >
                  {feedback.comment}
                </li>
                <hr />
              </ol>
            ))}
          </div>
          <form
            action=""
            onSubmit={handleSubmit}
            style={{
              width: "40%",

              padding: "10px",
            }}
          >
            <input
              type="text"
              placeholder="Write Comment"
              style={{ padding: "8px", width: "80%" }}
              onChange={(e) => setComment(e.target.value)}
              value={comment}
            />
            <br />
            <button
              style={{
                padding: "6px",
                margin: "5px 0 ",
                backgroundColor: "black",
                border: "none",
                color: "white",
              }}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
