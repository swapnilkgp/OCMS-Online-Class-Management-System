import React from "react";
import { Link } from "react-router-dom";
// import "../style.css";

const Index = () => {
  return (
    <div className="abc">
      <div className="container-fluid position-relative p-0">
        <div
          id="header-carousel"
          className="carousel slide carousel-fade"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img className="w-100" src="img/carousel-1.jpg" alt="Image" />
              <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                <div className="p-3">
                  <h5 className="text-white text-uppercase mb-3 animated slideInDown">
                    Welcome
                  </h5>
                  <h1 className="display-1 text-white mb-md-4 animated zoomIn">
                    IIT KGP's Online classroom
                  </h1>
                  <Link to="/signin">
                    <a className="btn btn-primary py-md-3 px-md-5 me-3 animated slideInLeft">
                      Log in
                    </a>
                  </Link>

                  <Link to="/signup">
                    <a className="btn btn-outline-light py-md-3 px-md-5 animated slideInRight">
                      Sign up
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;

// style = "max-width: 900px;";
