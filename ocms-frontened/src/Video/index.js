import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

const Index = () => {
  const navigate = useNavigate();
  const locate = useLocation();
  const { id } = locate.state;
  const [file, setFile] = useState({});
  useEffect(() => {
    axios({
      method: "POST",
      url: "http://127.0.0.1:8000/api/getvideo/",
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
  }, []);
  return (
    <div className="Rightside ">
      <nav className="navbar1">
        <div>Video: {file.caption}</div>
      </nav>
      <video className="video" controls autoplay src={file.link}></video>
      <article className="bottombar">
        <p className="btn" onClick={() => navigate("/courses/course/videos")}>
          {"<<"}&nbsp;&nbsp;Back
        </p>
      </article>
    </div>
  );
};

export default Index;
