import React, { useState, useEffect } from "react";
import ContentEditable from "react-contenteditable";
import { errorCheck, convertCommandsToSteps } from "./Interpreter";
import { toast } from "react-toastify";

const Editor = ({ submitSteps, activeLine }) => {
  const [code, setCode] = useState(`Hello\nWorld\nLet's\nCode`);
  const [number, setNumber] = useState(
    `<pre>1</pre><pre>2</pre><pre><mark>3</mark></pre><pre>4</pre>`
  );
  const [lineNum, setLineNum] = useState(4);

  const handleChange = e => {
    let change = e.target.value;
    let cleaned = cleanEditor(change);
    console.log(change);
    console.log(cleaned);
    if (change === "") {
      console.log("oops");
      setCode(``);
      setNumber(`<pre>1</pre>`);
      setLineNum(1);
      return;
    }

    let len = cleaned.length;
    let numberStr = "";
    for (let i = 1; i <= len; i++) {
      numberStr += `<pre>${i}</pre>`;
    }
    setCode(cleaned.join("\n"));
    setNumber(numberStr);
    setLineNum(len);
  };

  useEffect(() => {
    let numberStr = "";
    for (let i = 1; i <= lineNum; i++) {
      numberStr +=
        i === activeLine ? `<pre><mark>${i}</mark></pre>` : `<pre>${i}</pre>`;
    }
    setNumber(numberStr);
  }, [activeLine, lineNum]);

  const cleanEditor = data => {
    let lines = data.split("\n");
    //trim front and back <pre> tags
    lines.forEach((item, i) => {
      let arr = item.split("\n");
      lines[i] = arr;
    });
    let flatten = lines.flat();
    return flatten;
  };

  const handleRun = () => {
    let fullCommands = [];

    // Split code into lines
    const lines = code.split("\n");

    //errorChecking
    for (let i = 0; i < lines.length; i++) {
      let clean = lines[i].replace(/(^\s+|\s+$)/g, "");
      let resp = errorCheck(clean, i+1);
      if (!resp.status) {
        toast.error("ERROR in line " + (i + 1), {
          position: toast.POSITION.TOP_CENTER
        });
        toast.error(resp.msg, {
          position: toast.POSITION.TOP_CENTER,
          delay: 500
        });
        return;
      } else if (resp.msg === "skip") {
        continue;
      } else {
        fullCommands.push(resp);
      }
    }

    //convert to steps
    let steps = convertCommandsToSteps(fullCommands);

    //send to canvas
    submitSteps(steps);
  };

  return (
    <div className="editor">
      <h2>tartle.code</h2>
      <div className="editor-code">
        <ContentEditable
          html={number}
          disabled={true}
          className="code-number"
        />
        <textarea
          value={code}
          disabled={false}
          onChange={handleChange}
          className="code-text"
        />
      </div>
      <button onClick={handleRun}>Run</button>
    </div>
  );
};

export default Editor;
