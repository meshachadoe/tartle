import React, { useEffect, useRef, useState } from "react";
import TurtleImg from "../assets/turtle.png";
const Turtle = ({ x, y, rot }) => {
  const size = 30;
  return (
    <img
      className="turtle"
      src={TurtleImg}
      style={{
        left: x - size / 2,
        top: y - size / 2,
        transform: `rotate(${rot}deg)`,
      }}
    />
  );
};

export default Turtle;
