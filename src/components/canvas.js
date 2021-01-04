import React, { useEffect, useRef, useState } from "react";
import Turtle from "./Turtle";

const Canvas = ({ steps, setActiveLine }) => {
  const canvasRef = useRef(null);
  const [ctx, setCtx] = useState(null);
  const [turtle, setTurtle] = useState({
    x: 250,
    y: 250,
    angle: 0,
    penDown: true,
  });
  const i = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    setCtx(canvas.getContext("2d"));

    // const interval = setInterval(() => {
    //   let temp = { ...turtle };
    //   temp.x += 5;
    //   if (temp.x >= 500) temp.x = 0;
    //   setTurtle(temp);
    // }, 100);
    // return () => {
    //   clearInterval(interval);
    // };
  }, [canvasRef]);

  const strokeTurtle = (currT, prevT) => {
    if (!prevT.penDown) return;
    if (prevT.x == currT.x && prevT.y == currT.y) return;
    ctx.beginPath();
    ctx.lineWidth = 5;
    ctx.strokeStyle = "#a7496e";
    ctx.moveTo(prevT.x, prevT.y);
    ctx.lineTo(currT.x, currT.y);
    ctx.stroke();
  };

  useEffect(() => {
    let interval;
    if (steps.length === 0) return;
    console.log("hello");
    interval = setInterval(() => {
      setTurtle(steps[i.current]);
      setActiveLine(steps[i.current].index);
      // strokeTurtle(
      //   steps[i.current],
      //   i.current === 0 ? steps[i.current] : steps[i.current - 1]
      // );
      let currT = steps[i.current];
      let prevT = i.current === 0 ? steps[i.current] : steps[i.current - 1];
      let skip = false;

      if (!prevT.penDown) skip = true;
      if (prevT.x == currT.x && prevT.y == currT.y) skip = true;
      if (!skip) {
        ctx.beginPath();
        ctx.lineWidth = 5;
        ctx.strokeStyle = "#a7496e";
        ctx.moveTo(prevT.x, prevT.y);
        ctx.lineTo(currT.x, currT.y);
        ctx.stroke();
      }

      i.current++;

      if (i.current === steps.length) {
        clearInterval(interval);
        i.current = 0;
      }
    }, 30);

    return () => {
      clearInterval(interval);
    };
  }, [ctx, steps]);

  return (
    <div className="canvas-container">
      <canvas
        className="canvas"
        ref={canvasRef}
        width={500}
        height={500}
      ></canvas>
      <Turtle x={turtle.x} y={turtle.y} rot={turtle.angle} />
      <button className="button-save">Save Image</button>
    </div>
  );
};

export default Canvas;
