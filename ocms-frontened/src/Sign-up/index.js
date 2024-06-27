import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Index = () => {
  const navigate = useNavigate();
  const [person, setPerson] = useState({
    username: "",
    email: "",
    otp: "",
    password: "",
    confpassword: "",
  });
  const [isOtp, setIsOtp] = useState(false);
  const [OTP, setOTP] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setPerson({ ...person, [name]: value });
  };
  const getOtp = (e) => {
    e.preventDefault();
    if (person.username && person.email) {
      const data = { email: person.email };
      axios({
        method: "post",
        url: "http://127.0.0.1:8000/api/otp/",
        data: {
          email: person.email,
        },
      })
        .then((res) => {
          setOTP(res.data);
        })
        .catch((e) => {
          console.log(e);
        });
      setPerson({ ...person, otp: "" });
      setIsOtp(true);
    }
  };
  const handleVerify = (e) => {
    e.preventDefault();
    if (OTP == person.otp) {
      setIsVerified(true);
    } else {
      alert("Incorrect OTP");
      setPerson({ ...person, otp: "" });
    }
  };
  const handleSubmit = () => {
    if (person.password != person.confpassword) {
      alert("Password is not matching");
      setPerson({ ...person, password: "", confpassword: "" });
    } else {
      //API call and rerouting
      axios({
        method: "post",
        url: "http://127.0.0.1:8000/api/signup/",
        data: {
          username: person.username,
          email: person.email,
          password: person.password,
        },
      })
        .then((obj) => {
          console.log(obj);
          localStorage.setItem("userID", obj.data.userID);
          localStorage.setItem("username", obj.data.username);

          navigate("/courses");
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };
  return (
    <div className="middle">
      <div className="bhetor">
        {isVerified ? (
          <article className="form">
            <div className="flexbox">
              <h3>Congratulations</h3>
              <br />
              <h4>your email id is verified</h4>
              <br />
              <p>Set a password for your classroom account </p>
            </div>
            <div className="form-control">
              <label htmlFor="password">Enter Password : </label>
              <input
                type="password"
                id="password"
                name="password"
                value={person.password}
                onChange={handleChange}
              />
            </div>
            <div className="form-control">
              <label htmlFor="confpassword">Confirm Password : </label>
              <input
                type="password"
                id="confpassword"
                name="confpassword"
                value={person.confpassword}
                onChange={handleChange}
              />
            </div>
            <div className="flexbox">
              <p className="btn1" onClick={handleSubmit}>
                Submit
              </p>
            </div>
          </article>
        ) : (
          <article className="form">
            <div className="flexbox">
              <h2>IIT Kharagpur</h2>
              <h3>Sign up</h3>
              <p>to join our classroom</p>
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
                <label htmlFor="email">Email : </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={person.email}
                  onChange={handleChange}
                />
              </div>
              {isOtp ? (
                <>
                  <div className="form-control">
                    <label htmlFor="otp">Enter OTP: </label>
                    <input
                      type="text"
                      id="otp"
                      name="otp"
                      value={person.otp}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flexbox">
                    <p className="underline" onClick={getOtp}>
                      Resend OTP
                    </p>
                    <br />
                    <br />
                    <br />
                    <p className="btn1" onClick={handleVerify}>
                      Verify
                    </p>
                  </div>
                </>
              ) : (
                <div className="flexbox">
                  <button onClick={getOtp}>Get OTP</button>
                </div>
              )}
            </form>
          </article>
        )}
      </div>
    </div>
  );
};

export default Index;
