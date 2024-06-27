import axios from "axios";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Error from "../Error";
import "./index.css";

const Index = () => {
  const userID = localStorage.getItem("userID");
  const coursecode = localStorage.getItem("coursecode");
  const [course, setCourse] = useState({ coursecode: "" });
  const [isJoined, setIsJoined] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setCourse({ ...course, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (course.coursecode) {
      // API call
      axios({
        method: "POST",
        url: "http://127.0.0.1:8000/api/joincourse/",
        data: {
          coursecode: course.coursecode,
          userID: userID,
        },
      })
        .then((obj) => {
          if (obj.data == true) setIsJoined(true);
          else {
            alert("Incorrect Coursecode");
            setCourse({ coursecode: "" });
          }
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      setError(true);
    }
  };
  const handleClear = (e) => {
    e.preventDefault();
    setIsJoined(false);
    setCourse({ coursecode: "" });
  };
  return (
    <>
      <article className="forma">
        <div>
          <h3>Join Course</h3>
          <br />
          <p className="bold">
            Join a course with a course-code provided by the Professor to get
            access to video lectures, assignments and schedules.
          </p>
          <br />
          <br />
        </div>

        <form>
          <label htmlFor="coursecode">Course code : </label>
          <div className="forma-control">
            <input
              type="text"
              id="coursecode"
              name="coursecode"
              value={course.coursecode}
              onChange={handleChange}
              autoComplete="off"
            />
          </div>
          {isJoined ? (
            <div className="flexbox">
              <p className="bold">
                Congratulations, you have successfully joined the course.
              </p>
              <button className="btn" onClick={handleClear}>
                Join another course
              </button>
            </div>
          ) : (
            <div className="flexbox">
              <button className="btn" onClick={handleSubmit}>
                Join
              </button>
            </div>
          )}
        </form>
      </article>
      {error && (
        <Error
          message={"Please Enter a Coursecode"}
          handleError={(e) => {
            e.preventDefault();
            setError(false);
          }}
        />
      )}
    </>
  );
};

export default Index;
