import axios from "axios";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";
import Error from "../Error";

const Index = () => {
  const [error, setError] = useState(false);
  const userID = localStorage.getItem("userID");
  const [course, setCourse] = useState({
    coursename: "",
    courseno: "",
    coursecode: "",
  });
  const [isCreated, setIsCreated] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setCourse({ ...course, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (course.coursename && course.courseno) {
      // API call
      axios({
        method: "POST",
        url: "http://127.0.0.1:8000/api/createcourse/",
        data: {
          coursename: course.coursename,
          courseno: course.courseno,
          userID: userID,
        },
      })
        .then((obj) => {
          setCourse({ ...course, coursecode: obj.data });
        })
        .catch((e) => {
          console.log(e);
        });
      setIsCreated(true);
    } else {
      setError(true);
    }
  };
  const handleClear = (e) => {
    setCourse({ coursename: "", courseno: "", coursecode: "" });
    setIsCreated(false);
  };
  return (
    <>
      <article className="forma">
        <div>
          <h3>Create your course</h3>
          <br />
          <p className="bold">
            Create your own course as per institute guidelines to get the
            facility of online live video meeting and sharing course materials,
            video recordings and assignment with your students .
          </p>
          <br />
          <br />
        </div>

        <form1>
          <label htmlFor="coursename">Course name : </label>
          <div className="forma-control">
            <input
              type="text"
              id="coursename"
              name="coursename"
              value={course.coursename}
              onChange={handleChange}
              autoComplete="off"
            />
          </div>
          <label htmlFor="courseno">Course number : </label>
          <div className="forma-control">
            <input
              type="courseno"
              id="courseno"
              name="courseno"
              value={course.courseno}
              onChange={handleChange}
            />
          </div>
          {isCreated ? (
            <div className="flexbox">
              <p className="bold">
                Your course code for this team is {course.coursecode}
              </p>
              <button className="btn" onClick={handleClear}>
                Create another course
              </button>
            </div>
          ) : (
            <div className="flexbox">
              <button className="btn" onClick={handleSubmit}>
                Create
              </button>
            </div>
          )}
        </form1>
      </article>
      {error && (
        <Error
          message={"Please Enter a Coursename and a Coursenumber"}
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
