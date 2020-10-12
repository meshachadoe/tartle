import React, { useState } from "react";
import ContentEditable from "react-contenteditable";

function Editor() {
  const [code, setCode] = useState(`<pre>Hello\nWorld\nLet's\nCode</pre>`);
  const [number, setNumber] = useState(`<pre>1\n2\n3\n4</pre>`);

  const handleChange = e => {
    let change = e.target.value;

    let len = change.split("<pre>").length - 1;
    let numberStr = "";
    for (let i = 1; i <= len; i++) {
      numberStr += `<pre>${i}</pre>`;
    }
    setCode(change);
    setNumber(numberStr);
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
        <ContentEditable
          html={code}
          disabled={false}
          onChange={handleChange}
          className="code-text"
        />
      </div>
      <button>Run</button>
    </div>
  );
}

export default Editor;
