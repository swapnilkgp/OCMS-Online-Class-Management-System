import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Error from "../Error";

const Index = () => {
  const [person, setPerson] = useState({ username: "", password: "" });
  const [error1, setError1] = useState(false);
  const [error2, setError2] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setPerson({ ...person, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (person.username && person.password) {
      // API call
      axios({
        method: "POST",
        url: "http://127.0.0.1:8000/api/signin/",
        data: {
          password: person.password,
          username: person.username,
        },
      })
        .then((obj) => {
          if (obj.data == "") {
            setError1(true);
          } else {
            localStorage.setItem("userID", obj.data.userID);
            localStorage.setItem("username", obj.data.username);
            navigate("/courses");
          }
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      setError2(true);
    }
  };
  return (
    <div className="middle">
      <div className="bhetor">
        <article className="form">
          <div className="flexbox">
            <h2>IIT Kharagpur</h2>
            <h3>Sign in</h3>
            <p>to continue with classroom</p>
          </div>

          <form>
            <div className="form-control">
              <label htmlFor="username">Name : </label>
              <input
                type="text"
                id="username"
                name="username"
                value={person.username}
                onChange={handleChange}
              />
            </div>
            <div className="form-control">
              <label htmlFor="password">Password : </label>
              <input
                type="password"
                id="password"
                name="password"
                value={person.password}
                onChange={handleChange}
              />
            </div>
            <div className="flexbox">
              <button onClick={handleSubmit}>Log in</button>
            </div>
          </form>
        </article>
      </div>
      {error1 && (
        <Error
          message={"Incorrect Password"}
          handleError={(e) => {
            e.preventDefault();
            setError1(false);
            setPerson({ ...person, password: "" });
          }}
        />
      )}
      {error2 && (
        <Error
          message={"Please enter all the details"}
          handleError={(e) => {
            e.preventDefault();
            setError2(false);
          }}
        />
      )}
    </div>
  );
};

export default Index;
