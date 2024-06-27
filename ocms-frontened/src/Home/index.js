import React from "react";
import { Link } from "react-router-dom";
import "./index.css";
const Index = () => {
  return (
    <>
      <div className="container page">
        <h2>Welcome to IIT KGP's Online Classroom</h2>
        <h4>
          Sign in to attend online classes and access the course materials.
        </h4>
        <div>
          <Link to="/signin">
            <p className="btn">Sign in</p>
          </Link>
          <Link to="/signup">
            <p className="btn">Sign up</p>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Index;
