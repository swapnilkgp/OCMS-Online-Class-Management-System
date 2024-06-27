import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./index.css";

const Index = () => {
  const userID = localStorage.getItem("userID");
  const coursecode = localStorage.getItem("coursecode");
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [asgn, setAsgn] = useState({
    caption: "",
    instructions: "",
    maxmarks: "",
    date: "",
    time: "",
  });
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setAsgn({ ...asgn, [name]: value });
  };

  const handleUpload = (e) => {
    console.log(asgn.date);
    console.log(asgn.time);
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("deadlinedate", asgn.date);
    formData.append("deadlinetime", asgn.time);
    formData.append("caption", asgn.caption);
    formData.append("coursecode", coursecode);
    formData.append("instructions", asgn.instructions);
    formData.append("maxmarks", asgn.maxmarks);
    axios({
      method: "POST",
      url: "http://127.0.0.1:8000/api/uploadassignment/",
      data: formData,
    })
      .then((res) => {
        navigate("/courses/course/assignments");
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <div className="Rightside ">
      <nav className="navbar1">
        <div>Create Assignment</div>
      </nav>
      <div className="Rightchild">
        <article className="formc">
          <form>
            <h4>File : </h4>
            <div className="formc-control">
              <input
                type="file"
                id="file"
                accept="pdf"
                name="file"
                onChange={(e) => {
                  const a = e.target.files[0];
                  setFile(a);
                }}
              />
            </div>
            <h4>Caption : </h4>
            <div className="formc-control">
              <input
                type="text"
                id="caption"
                name="caption"
                value={asgn.caption}
                onChange={handleChange}
              />
            </div>
            <h4>Instruction : </h4>
            <div className="formc-control">
              <input
                type="text"
                id="instructions"
                name="instructions"
                value={asgn.instructions}
                onChange={handleChange}
              />
            </div>
            <h4>Total Points : </h4>
            <div className="formc-control">
              <input
                type="text"
                id="maxmarks"
                name="maxmarks"
                value={asgn.maxmarks}
                onChange={handleChange}
              />
            </div>
            <h4>Deadline date : </h4>
            <div className="formc-control">
              <input
                type="date"
                id="date"
                name="date"
                value={asgn.date}
                onChange={handleChange}
              />
            </div>
            <h4>Deadline time: </h4>
            <div className="formc-control">
              <input
                type="time"
                id="time"
                name="time"
                value={asgn.time}
                onChange={handleChange}
              />
            </div>
          </form>
        </article>
      </div>
      <article className="bottombar">
        <p className="btn" onClick={handleUpload}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="23"
            height="23"
            fill="currentColor"
            class="bi bi-file-earmark-arrow-up"
            viewBox="0 0 16 16"
          >
            <path d="M8.5 11.5a.5.5 0 0 1-1 0V7.707L6.354 8.854a.5.5 0 1 1-.708-.708l2-2a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 7.707V11.5z" />
            <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z" />
          </svg>
          &nbsp;Upload
        </p>
      </article>
    </div>
  );
};

export default Index;
