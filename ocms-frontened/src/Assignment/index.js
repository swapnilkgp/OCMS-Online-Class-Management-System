import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./index.css";

const Index = () => {
  const [nsol, setNsol] = useState({ name: "", link: "" });
  const userID = localStorage.getItem("userID");
  const coursecode = localStorage.getItem("coursecode");
  const [status, setStatus] = useState({
    isLive: false,
    isCompleted: false,
    score: "",
    review: "",
    isGraded: false,
    TA: "",
  });
  const [access, setAccess] = useState(localStorage.getItem("access"));
  const [soln, setSoln] = useState(null);
  const navigate = useNavigate();
  const locate = useLocation();
  const { id } = locate.state;
  const [file, setFile] = useState({});
  useEffect(() => {
    const date = new Date();
    const minute = date.getMinutes();

    if (date.getMinutes < 10) {
      const minuete = "0" + date.getMinutes();
    }
    const today =
      date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();
    const time = date.getHours() + ":" + minute;
    axios({
      method: "POST",
      url: "http://127.0.0.1:8000/api/getassignment/",
      data: {
        id: id,
      },
    })
      .then((res) => {
        setFile(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
    axios({
      method: "POST",
      url: "http://127.0.0.1:8000/api/checkasgnstatus/",
      data: {
        userID: userID,
        assignmentID: id,
        date: today,
        time: time,
      },
    })
      .then((res) => {
        setStatus(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
    axios({
      method: "POST",
      url: "http://127.0.0.1:8000/api/getsolutionfile/",
      data: {
        userID: userID,
        assignmentID: id,
      },
    })
      .then((res) => {
        if (res.data != "") {
          setNsol(res.data);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const seeSolutions = (e) => {
    e.preventDefault();
    navigate("/courses/course/assignments/solutions", {
      state: { id: id },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const date = new Date();
    const minute = date.getMinutes();

    if (date.getMinutes < 10) {
      const minuete = "0" + date.getMinutes();
    }
    const today =
      date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();
    const time = date.getHours() + ":" + minute;
    const formData = new FormData();
    formData.append("file", soln);
    formData.append("date", today);
    formData.append("time", time);
    formData.append("userID", userID);
    formData.append("assignmentID", id);
    axios({
      method: "POST",
      url: "http://127.0.0.1:8000/api/submitsolution/",
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
        <div>Assignments</div>
      </nav>
      <div className="asgn">
        <div className="asgnleft">
          <h3 className="asgn1">{file.caption}</h3>
          <br />
          <p>
            Due on {file.deadlinedate} at {file.deadlinetime}
          </p>
          <br />
          <h4>Instructions</h4>
          <p>{file.instructions}</p>
          <br />
          <h4>Reference materials</h4>
          <br />
          <div className="forme-control fileoverflow">
            <a href={file.link} target="_blank" download={file.link}>
              {file.filename}
            </a>
          </div>
          <br />
          <br />
          <br />
          {status.isLive && status.isCompleted && (
            <div>
              <h4>Your previous solution:</h4>
              <br />
              <div className="forme-control fileoverflow">
                <a href={nsol.link} target="_blank" download={nsol.link}>
                  {nsol.name}
                </a>
              </div>
              <br />
              <br />
              <br />
            </div>
          )}
          {access == "S" && (
            <div>
              <h4>Upload your solution here : </h4>
              <form className="formd">
                <div className="formd-control">
                  <input
                    type="file"
                    id="file"
                    name="file"
                    onChange={(e) => {
                      const a = e.target.files[0];
                      setSoln(a);
                    }}
                  />
                </div>
              </form>
            </div>
          )}
        </div>
        <div className="asgnmiddle">
          <h4>Total marks</h4>
          <p>{file.maxmarks}</p>
          {!(access == "S") && (
            <div>
              <br />
              <br />
              <button onClick={seeSolutions}>See Submissions</button>
            </div>
          )}
          {access == "S" && (
            <div>
              {status.isGraded && (
                <div>
                  <br />
                  <br />
                  <h4>Your marks:</h4>
                  <p> {status.score}</p>
                  <h4>Feedback:</h4>
                  <p>{status.review}</p>
                  <h4>Graded by {status.TA}</h4>
                </div>
              )}
              <br />
              <br />
              {status.isLive &&
                (status.isCompleted ? (
                  <button onClick={handleSubmit}>Resubmit</button>
                ) : (
                  <button onClick={handleSubmit}>Submit</button>
                ))}
            </div>
          )}
        </div>
      </div>

      <article className="bottombar">
        <p
          className="btn"
          onClick={() => navigate("/courses/course/assignments")}
        >
          {"    <<     "}Back
        </p>
      </article>
    </div>
  );
};

export default Index;
