import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";

const Student = ({ user, access, makeTA }) => {
  const userID = localStorage.getItem("userID");
  const coursecode = localStorage.getItem("coursecode");
  const username = localStorage.getItem("username");
  const [showDropdown, setShowDropdown] = useState(false);
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };
  const myStyle = {
    position: "relative",
    height: "2.2rem",
    width: "2.2rem",
    borderRadius: "50%",
    backgroundColor: showDropdown && "lightgrey",
    color: showDropdown && "black",
    display: "grid",
    alignItems: "center",
    cursor: "pointer",
    justifyContent: "center",
  };
  useEffect(() => {
    const manageDropdown = (e) => {
      if (e.target.id !== "dotsstud") {
        setShowDropdown(false);
      }
    };
    window.addEventListener("click", manageDropdown);
    return () => {
      window.removeEventListener("click", manageDropdown);
    };
  });
  return (
    <>
      <div key={user.id} className="studbox">
        <div className="circle">{user.logo}</div>
        {username == user.name ? (
          <div className="sender">
            {user.name}
            {"  "}(You)
          </div>
        ) : (
          <div className="sender">{user.name}</div>
        )}
        {!(access == "S") && (
          <div onClick={toggleDropdown} style={myStyle}>
            <svg
              id="dotsstud"
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              class="bi bi-three-dots-vertical"
              viewBox="0 0 16 16"
            >
              <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
            </svg>
            {showDropdown && (
              <div className="dropdownabs" key={user.id}>
                <div
                  onClick={() => {
                    makeTA(user.id);
                  }}
                >
                  <p>Make TA</p>
                </div>
                <div>
                  <p>Remove</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

const Teachingassistant = ({ user, access }) => {
  const userID = localStorage.getItem("userID");
  const coursecode = localStorage.getItem("coursecode");
  const username = localStorage.getItem("username");
  const [showDropdown, setShowDropdown] = useState(false);
  const myStyle = {
    position: "relative",
    height: "2.2rem",
    width: "2.2rem",
    borderRadius: "50%",
    backgroundColor: showDropdown && "lightgrey",
    color: showDropdown && "black",
    display: "grid",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
  };
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };
  useEffect(() => {
    const manageDropdown = (e) => {
      if (e.target.id !== "dotsta") {
        setShowDropdown(false);
      }
    };
    window.addEventListener("click", manageDropdown);
    return () => {
      window.removeEventListener("click", manageDropdown);
    };
  });
  return (
    <>
      <div key={user.id} className="studbox">
        <div className="circle">{user.logo}</div>
        {username == user.name ? (
          <div className="sender">
            {user.name}
            {"  "}(You)
          </div>
        ) : (
          <div className="sender">{user.name}</div>
        )}
        {access == "P" && (
          <div style={myStyle} onClick={toggleDropdown}>
            <svg
              id="dotsta"
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              class="bi bi-three-dots-vertical"
              viewBox="0 0 16 16"
            >
              <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
            </svg>
            {showDropdown && (
              <div className="dropdownabs" key={user.id}>
                <div>
                  <p>Make Student</p>
                </div>
                <div>
                  <p>Remove</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

const Professor = ({ user }) => {
  const userID = localStorage.getItem("userID");
  const coursecode = localStorage.getItem("coursecode");
  const username = localStorage.getItem("username");
  const [showDropdown, setShowDropdown] = useState(false);
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };
  useEffect(() => {
    console.log("Hello");
  }, []);
  return (
    <>
      <div key={user.id} className="studbox">
        <div className="circle">{user.logo}</div>
        {username == user.name ? (
          <div className="sender">
            {user.name}
            {"  "}(You)
          </div>
        ) : (
          <div className="sender">{user.name}</div>
        )}
      </div>
    </>
  );
};

const Index = () => {
  const userID = localStorage.getItem("userID");
  const coursecode = localStorage.getItem("coursecode");
  const username = localStorage.getItem("username");
  const [access, setAccess] = useState(localStorage.getItem("access"));
  const [s, setS] = useState([]);
  const [p, setP] = useState([]);
  const [t, setT] = useState([]);

  useEffect(() => {
    axios({
      method: "POST",
      url: "http://127.0.0.1:8000/api/teammembers/",
      data: {
        coursecode: coursecode,
      },
    })
      .then((res) => {
        console.log(res);
        setS(res.data.S);
        setP(res.data.P);
        setT(res.data.T);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const makeTA = (x) => {
    axios({
      method: "POST",
      url: "http://127.0.0.1:8000/api/makeTA/",
      data: {
        userID: x,
        coursecode: coursecode,
      },
    })
      .then((res) => {
        axios({
          method: "POST",
          url: "http://127.0.0.1:8000/api/teammembers/",
          data: {
            coursecode: coursecode,
          },
        })
          .then((res) => {
            setS(res.data.S);
            setP(res.data.P);
            setT(res.data.T);
          })
          .catch((e) => {
            console.log(e);
          });
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <div>
      <div className="Rightside">
        <nav className="navbar1">
          <div>Team Members</div>
        </nav>
        <div className="teammembers">
          <h4 className="h">Professor</h4>
          <div className="pts">
            {p.map((user) => {
              return <Professor key={user.id} user={user} />;
            })}
          </div>
          <br />
          <hr />
          <h4 className="h">Teaching Assistants</h4>
          <div className="pts">
            {t.map((user) => {
              return (
                <Teachingassistant key={user.id} user={user} access={access} />
              );
            })}
          </div>
          <br />
          <hr />
          <h4 className="h">Students</h4>
          <div className="pts">
            {s.map((user) => {
              return (
                <Student
                  key={user.id}
                  user={user}
                  access={access}
                  makeTA={makeTA}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
