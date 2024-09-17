import React from "react";
import image from "../Image1.jpg";

function Main() {
  return (
    <>
      <div className="main-component">
        <h2>Time to Get Organized</h2>
        <p>
          With our app, you can keep all your shifts organized in one place. Say
          goodbye to confusion and missed shifts! Our intuitive shift manager
          helps you stay on top of your schedule effortlessly. Whether you're
          managing your own shifts or coordinating a team, we've got you
          covered. Get clarity, save time, and focus on what really matters.
        </p>
        <img src={image} id="img-main"></img>
      </div>
    </>
  );
}

export default Main;
