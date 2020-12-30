import React, { useState } from "react";
import Button from "./Button";
import Editor from "./Editor";
import Canvas from "./Canvas";
import "../scss/main.scss";
import "../scss/button.scss";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Main() {
  const [steps, setSteps] = useState([]);
  const [activeLine, setActiveLine] = useState(0);
  const submitSteps = data => {
    console.log(data);
    setSteps(data);
  };

  return (
    <div className="main">
      <ToastContainer />
      <Button />
      <Editor submitSteps={submitSteps} activeLine={activeLine} />
      <Canvas steps={steps} setActiveLine={setActiveLine} />
    </div>
  );
}

export default Main;
