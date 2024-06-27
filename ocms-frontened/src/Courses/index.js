import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Index = () => {
  const userID = localStorage.getItem("userID");
  const username = localStorage.getItem("username");
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    axios({
      method: "POST",
      url: "http://127.0.0.1:8000/api/getcourses/",
      data: {
        userID: userID,
      },
    })
      .then((res) => {
        setCourses(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <>
      <div className="courselist">
        {courses.map((course) => {
          return (
            <div
              key={course.coursecode}
              className="flexbox course"
              onClick={() => {
                axios({
                  method: "POST",
                  url: "http://127.0.0.1:8000/api/checkuser/",
                  data: {
                    userID: userID,
                    coursecode: course.coursecode,
                  },
                })
                  .then((res) => {
                    localStorage.setItem("access", res.data);
                    localStorage.setItem("coursecode", course.coursecode);
                    navigate("/courses/course/home");
                  })
                  .catch((e) => {
                    console.log(e);
                  });
              }}
            >
              <p className="logo">{course.logo}</p>
              <p className="coursename">{course.coursename}</p>
              <h4>{course.courseno}</h4>
            </div>
          );
        })}
        <div className="flexbox newcourse">
          <br />
          <p className="coursename">Hey {username}</p>
          <br />
          <h4>eager to join or create course</h4>
          <br />
          <div className="flex">
            <button
              onClick={() => {
                navigate("/courses/joincourse");
              }}
            >
              Join
            </button>
            <button
              onClick={() => {
                navigate("/courses/createcourse");
              }}
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
