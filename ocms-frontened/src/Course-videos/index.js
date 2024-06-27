import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// import "./index.css";

const Index = () => {
  const userID = localStorage.getItem("userID");
  const coursecode = localStorage.getItem("coursecode");
  const [access, setAccess] = useState(localStorage.getItem("access"));
  const navigate = useNavigate();
  const [isConv, setIsConv] = useState(false);
  const [file, setFile] = useState(null);
  const [caption, setCaption] = useState("");
  const [filelist, setFilelist] = useState([]);
  useEffect(() => {
    axios({
      method: "POST",
      url: "http://127.0.0.1:8000/api/getvideoinfo/",
      data: {
        coursecode: coursecode,
      },
    })
      .then((res) => {
        setFilelist(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const handleUpload = (e) => {
    const date = new Date();
    const minute = date.getMinutes();

    if (date.getMinutes < 10) {
      const minuete = "0" + date.getMinutes();
    }
    const today =
      date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();
    const time = date.getHours() + ":" + minute;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("date", today);
    formData.append("time", time);
    formData.append("caption", caption);
    formData.append("coursecode", coursecode);
    axios({
      method: "POST",
      url: "http://127.0.0.1:8000/api/uploadvideo/",
      data: formData,
    })
      .then((res) => {
        axios({
          method: "POST",
          url: "http://127.0.0.1:8000/api/getvideoinfo/",
          data: {
            coursecode: coursecode,
          },
        })
          .then((res) => {
            setFilelist(res.data);
          })
          .catch((e) => {
            console.log(e);
          });
      })
      .catch((e) => {
        console.log(e);
      });
    setIsConv(false);
    setFile(null);
    setCaption("");
  };
  return (
    <div className="Rightside ">
      <nav className="navbar1">
        <div>Video Lectures</div>
      </nav>
      <div className="videolist">
        {filelist.map((video) => {
          return (
            <>
              <div
                key={video.id}
                className="videobox"
                onClick={() => {
                  navigate("/courses/course/videos/video", {
                    state: { id: video.id },
                  });
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  fill="currentColor"
                  class="bi bi-play-circle"
                  viewBox="0 0 20 20"
                >
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                  <path d="M6.271 5.055a.5.5 0 0 1 .52.038l3.5 2.5a.5.5 0 0 1 0 .814l-3.5 2.5A.5.5 0 0 1 6 10.5v-5a.5.5 0 0 1 .271-.445z" />
                </svg>
                <p className="sender">{video.caption}</p>
                <p>{video.date}</p>
                <p>{video.time}</p>
              </div>
            </>
          );
        })}
      </div>
      {!(access == "S") && (
        <article className="bottombar">
          {isConv && (
            <>
              <article className="formb">
                <div className="formb-control">
                  <input
                    type="file"
                    name="file"
                    onChange={(e) => {
                      const a = e.target.files[0];
                      setFile(a);
                    }}
                  />
                  <div style={{ paddingTop: "5px" }}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="25"
                      height="25"
                      fill="currentColor"
                      class="bi bi-send"
                      viewBox="0 0 16 16"
                      onClick={handleUpload}
                    >
                      <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z" />
                    </svg>
                  </div>
                  <div></div>
                  <div style={{ color: "red" }}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="15"
                      height="15"
                      fill="currentColor"
                      class="bi bi-x-lg"
                      viewBox="0 0 16 16"
                      onClick={() => {
                        setIsConv(false);
                        setCaption("");
                      }}
                    >
                      <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
                    </svg>
                  </div>
                </div>
              </article>

              <article className="formb">
                <div className="formb-control">
                  <input
                    type="text"
                    id="caption"
                    name="caption"
                    value={caption}
                    placeholder="Give a Caption"
                    onChange={(e) => {
                      setCaption(e.target.value);
                    }}
                  />
                </div>
              </article>
            </>
          )}
          <p className="btn" onClick={() => setIsConv(true)}>
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
            &nbsp;Upload Video
          </p>
        </article>
      )}
    </div>
  );
};

export default Index;
