import React from "react";

const Index = ({ message, handleError }) => {
  return (
    <div className="errorpage">
      <div className="errorbox">
        <div id="one">{message}</div>
        <div id="two">
          <button onClick={handleError}>Okay</button>
        </div>
      </div>
    </div>
  );
};

export default Index;
