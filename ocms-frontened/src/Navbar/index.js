import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const Index = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const username = localStorage.getItem("username");
  const mystyle = {
    height: "2.2rem",
    width: "2.2rem",
    borderRadius: "50%",
    backgroundColor: showDropdown && "darkblue",
    color: showDropdown ? "white" : "white",
    display: "grid",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
  };
  const navigate = useNavigate();
  useEffect(() => {
    const manageDropdown = (e) => {
      if (e.target.id == "dotsnav") {
        setShowDropdown(!showDropdown);
      } else if (e.target.id == "true") {
        setShowDropdown(true);
      } else {
        setShowDropdown(false);
      }
    };
    window.addEventListener("click", manageDropdown);
    return () => {
      window.removeEventListener("click", manageDropdown);
    };
  });
  return (
    <div>
      <nav className="navbar">
        <div className="kgplogo"></div>
        <NavLink
          to="/courses"
          className={({ isActive }) => (isActive ? "link active" : "link")}
        >
          Home
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? "link active" : "link")}
        >
          Chats
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? "link active" : "link")}
        >
          Calender
        </NavLink>
        <div></div>
        <div style={mystyle}>
          <svg
            id="dotsnav"
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            fill="currentColor"
            className="bi bi-three-dots-vertical"
            viewBox="0 0 16 16"
          >
            <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
          </svg>
        </div>
      </nav>
      {showDropdown && (
        <div className="dropdownfixed" id="true">
          <div>
            <p className="top">You are logged in as</p>
            <p className="top">{username}</p>
          </div>
          <hr />
          <div className="flex">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="21"
                height="21"
                fill="currentColor"
                class="bi bi-person-circle"
                viewBox="0 0 16 16"
              >
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                <path
                  fill-rule="evenodd"
                  d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
                />
              </svg>
            </div>
            <div>
              <p>Your Profile</p>
            </div>
          </div>
          <hr />
          <div className="flex">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                fill="currentColor"
                class="bi bi-box-arrow-right"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"
                />
                <path
                  fill-rule="evenodd"
                  d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"
                />
              </svg>
            </div>
            <div>
              <p
                onClick={() => {
                  navigate("/");
                  localStorage.clear();
                }}
              >
                Sign out
              </p>
            </div>
          </div>
        </div>
      )}
      <section>
        <Outlet />
      </section>
    </div>
  );
};

export default Index;
