import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const userID = localStorage.getItem("userID");
  const coursecode = localStorage.getItem("coursecode");
  const [decide, setDecide] = useState("");
  const [access, setAccess] = useState(localStorage.getItem("access"));
  const navigate = useNavigate();
  const [dict, setDict] = useState({ U: [], P: [], C: [], C1: [], P1: [] });
  const [list, setList] = useState([]);
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
      url: "http://127.0.0.1:8000/api/getassignmentinfo/",
      data: {
        coursecode: coursecode,
        userID: userID,
        date: today,
        time: time,
      },
    })
      .then((res) => {
        setDict(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  useEffect(() => {
    if (access == "S") {
      setList(dict.U);
      setDecide("U");
    } else {
      setList(dict.P1);
      setDecide("P1");
    }
  }, [dict, access]);

  return (
    <div className="Rightside ">
      {access == "S" ? (
        <nav className="navbar1">
          <NavLink
            onClick={() => {
              setDecide("U");
              setList(dict.U);
            }}
            className={decide == "U" ? "link active2" : "link2"}
          >
            Upcoming
          </NavLink>
          <NavLink
            onClick={() => {
              setDecide("P");
              setList(dict.P);
            }}
            className={decide == "P" ? "link active2" : "link2"}
          >
            Past Due
          </NavLink>
          <NavLink
            onClick={() => {
              setDecide("C");
              setList(dict.C);
            }}
            className={decide == "C" ? "link active2" : "link2"}
          >
            Completed
          </NavLink>
        </nav>
      ) : (
        <nav className="navbar1">
          <NavLink
            onClick={() => {
              setDecide("P1");
              setList(dict.P1);
            }}
            className={decide == "P1" ? "link active2" : "link2"}
          >
            Upcoming
          </NavLink>
          <NavLink
            onClick={() => {
              setDecide("C1");
              setList(dict.C1);
            }}
            className={decide == "C1" ? "link active2" : "link2"}
          >
            Completed
          </NavLink>
        </nav>
      )}
      <div className="videolist">
        {list.map((video) => {
          return (
            <>
              <div
                key={video.id}
                className="asgnbox"
                onClick={() => {
                  navigate("/courses/course/assignments/asgn", {
                    state: { id: video.id },
                  });
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  fill="currentColor"
                  class="bi bi-file-earmark-pdf-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M5.523 12.424c.14-.082.293-.162.459-.238a7.878 7.878 0 0 1-.45.606c-.28.337-.498.516-.635.572a.266.266 0 0 1-.035.012.282.282 0 0 1-.026-.044c-.056-.11-.054-.216.04-.36.106-.165.319-.354.647-.548zm2.455-1.647c-.119.025-.237.05-.356.078a21.148 21.148 0 0 0 .5-1.05 12.045 12.045 0 0 0 .51.858c-.217.032-.436.07-.654.114zm2.525.939a3.881 3.881 0 0 1-.435-.41c.228.005.434.022.612.054.317.057.466.147.518.209a.095.095 0 0 1 .026.064.436.436 0 0 1-.06.2.307.307 0 0 1-.094.124.107.107 0 0 1-.069.015c-.09-.003-.258-.066-.498-.256zM8.278 6.97c-.04.244-.108.524-.2.829a4.86 4.86 0 0 1-.089-.346c-.076-.353-.087-.63-.046-.822.038-.177.11-.248.196-.283a.517.517 0 0 1 .145-.04c.013.03.028.092.032.198.005.122-.007.277-.038.465z" />
                  <path
                    fill-rule="evenodd"
                    d="M4 0h5.293A1 1 0 0 1 10 .293L13.707 4a1 1 0 0 1 .293.707V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2zm5.5 1.5v2a1 1 0 0 0 1 1h2l-3-3zM4.165 13.668c.09.18.23.343.438.419.207.075.412.04.58-.03.318-.13.635-.436.926-.786.333-.401.683-.927 1.021-1.51a11.651 11.651 0 0 1 1.997-.406c.3.383.61.713.91.95.28.22.603.403.934.417a.856.856 0 0 0 .51-.138c.155-.101.27-.247.354-.416.09-.181.145-.37.138-.563a.844.844 0 0 0-.2-.518c-.226-.27-.596-.4-.96-.465a5.76 5.76 0 0 0-1.335-.05 10.954 10.954 0 0 1-.98-1.686c.25-.66.437-1.284.52-1.794.036-.218.055-.426.048-.614a1.238 1.238 0 0 0-.127-.538.7.7 0 0 0-.477-.365c-.202-.043-.41 0-.601.077-.377.15-.576.47-.651.823-.073.34-.04.736.046 1.136.088.406.238.848.43 1.295a19.697 19.697 0 0 1-1.062 2.227 7.662 7.662 0 0 0-1.482.645c-.37.22-.699.48-.897.787-.21.326-.275.714-.08 1.103z"
                  />
                </svg>
                <p className="sender">{video.caption}</p>
                <p>Deadline:</p>
                <p>{video.date}</p>
                <p>{video.time}</p>
              </div>
            </>
          );
        })}
      </div>
      {!(access == "S") && (
        <article className="bottombar">
          <p
            className="btn"
            onClick={() => {
              navigate("/courses/course/assignments/asgnupload");
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="23"
              height="23"
              fill="currentColor"
              class="bi bi-pencil-square"
              viewBox="0 0 16 16"
            >
              <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
              <path
                fill-rule="evenodd"
                d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
              />
            </svg>
            &nbsp;Create an Assignment
          </p>
        </article>
      )}
    </div>
  );
};

export default Index;
