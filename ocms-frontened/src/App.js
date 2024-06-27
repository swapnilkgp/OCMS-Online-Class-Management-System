import React from "react";
import { useState } from "react";
// react router
import { BrowserRouter, Routes, Route } from "react-router-dom";
// pages
import Home from "./Home";
import Signin from "./Sign-in";
import Signup from "./Sign-up";
import Navbar from "./Navbar";
import Createcourse from "./Create-Course";
import Joincourse from "./Join-Course";
import Courses from "./Courses";
import Course from "./Course";
import Coursehome from "./Course-home";
import Coursevideos from "./Course-videos";
import Video from "./Video";
import Courseassignments from "./Course-assignments";
import Asgnupload from "./Asgn-upload";
import Assignment from "./Assignment";
import Students from "./Course-students";
import Solutions from "./Solutions";
import Solution from "./Solution";
import Newhome from "./newhome";

const App = () => {
  const [userID, setUserID] = useState("");
  const [username, setUsername] = useState("");
  const [coursecode, setCoursecode] = useState("");
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Newhome />} />
        <Route path="signin" element={<Signin />} />
        <Route path="signup" element={<Signup />} />
        <Route path="courses" element={<Navbar />}>
          <Route index element={<Courses />} />
          <Route
            path="course"
            element={<Course userID={userID} coursecode={coursecode} />}
          >
            <Route
              path="home"
              element={
                <Coursehome
                  userID={userID}
                  coursecode={coursecode}
                  username={username}
                />
              }
            />
            <Route
              path="videos"
              element={<Coursevideos userID={userID} coursecode={coursecode} />}
            />
            <Route path="videos/video" element={<Video />}></Route>
            <Route
              path="assignments"
              element={
                <Courseassignments userID={userID} coursecode={coursecode} />
              }
            />
            <Route
              path="assignments/asgnupload"
              element={<Asgnupload userID={userID} coursecode={coursecode} />}
            />
            <Route
              path="assignments/asgn"
              element={<Assignment userID={userID} coursecode={coursecode} />}
            />
            <Route
              path="students"
              element={<Students userID={userID} coursecode={coursecode} />}
            />
            <Route
              path="assignments/solutions"
              element={<Solutions userID={userID} coursecode={coursecode} />}
            />
            <Route
              path="assignments/solution"
              element={<Solution userID={userID} coursecode={coursecode} />}
            />
          </Route>

          <Route path="joincourse" element={<Joincourse userID={userID} />} />
          <Route
            path="createcourse"
            element={<Createcourse userID={userID} />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
