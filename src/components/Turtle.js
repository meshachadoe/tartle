import React, { useEffect, useRef, useState } from "react";

const Turtle = ({ x, y }) => {
  const size = 10;
  return (
    <div
      className="turtle"
      style={{ left: x - size / 2, top: y - size / 2 }}
    ></div>
  );
};

export default Turtle;
