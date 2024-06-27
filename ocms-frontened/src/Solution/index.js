import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./index.css";

const Index = () => {
  const userID = localStorage.getItem("userID");
  const coursecode = localStorage.getItem("coursecode");
  const navigate = useNavigate();
  const locate = useLocation();
  const [feed, setFeed] = useState({ score: "", review: "" });
  const { solnid, asgnid } = locate.state;
  const [asgn, setAsgn] = useState({});
  const [file, setFile] = useState({});

  useEffect(() => {
    axios({
      method: "POST",
      url: "http://127.0.0.1:8000/api/getassignment/",
      data: {
        id: asgnid,
      },
    })
      .then((res) => {
        setAsgn(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
    axios({
      method: "POST",
      url: "http://127.0.0.1:8000/api/getsolution/",
      data: {
        solutionID: solnid,
      },
    })
      .then((res) => {
        setFile(res.data);
        setFeed({ score: res.data.score, review: res.data.review });
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFeed({ ...feed, [name]: value });
  };

  return (
    <div className="Rightside ">
      <nav className="navbar1">
        <div>Submissions: {asgn.caption}</div>
      </nav>
      <div className="asgn">
        <div className="asgnleft">
          <h3>{file.username}</h3>
          <br />
          <p>
            Uploaded on {file.date} at {file.time}
          </p>
          <br />
          <h4>Instructions</h4>
          <p>{asgn.instructions}</p>
          <br />
          <div>
            <h4> Solution file: </h4>
            <div className="form-control fileoverflow">
              <a href={file.link} target="_blank" download={file.link}>
                {file.filename}
              </a>
            </div>
          </div>
        </div>
        <div className="asgnmiddle">
          <h4>Points</h4>
          <p>{asgn.maxmarks}</p>
          <form className="formf">
            <label htmlFor="score">Give Grade : </label>
            <div className="forma-control">
              <input
                type="text"
                id="score"
                name="score"
                value={feed.score}
                onChange={handleChange}
              />
            </div>
            <label htmlFor="review">Give Feedback : </label>
            <div className="formf-control">
              <input
                type="text"
                id="review"
                name="review"
                value={feed.review}
                onChange={handleChange}
              />
            </div>
            <div className="flexbox">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  axios({
                    method: "POST",
                    url: "http://127.0.0.1:8000/api/givegrade/",
                    data: {
                      userID: userID,
                      solutionID: solnid,
                      score: feed.score,
                      review: feed.review,
                    },
                  })
                    .then((res) => {
                      navigate("/courses/course/assignments/solutions", {
                        state: { id: asgnid },
                      });
                    })
                    .catch((e) => {
                      console.log(e);
                    });
                }}
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>

      <article className="bottombar">
        <p
          className="btn"
          onClick={() =>
            navigate("/courses/course/assignments/solutions", {
              state: { id: asgnid },
            })
          }
        >
          {"    <<     "}Back
        </p>
      </article>
    </div>
  );
};

export default Index;
