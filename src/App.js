import React, { useState } from "react";

import ButtonContainer from "./components/ButtonContainer";

import "./styles/index.scss";

function App() {
  const [displayText, setDisplayText] = useState("0");

  const updateDisplay = (arr, value) => {
    value =
      Number(value) && Number(value) < 0 && arr.length > 0
        ? `(${value})`
        : value;
    const result =
      arr
        .map(item =>
          typeof item === "number" && item < 0 ? `(${item})` : item
        )
        .join("") + value;

    setDisplayText(result);
  };

  return (
    <div id="wrapper" className="wrapper">
      <div id="calculator" className="calculator">
        <h4 id="header" className="header">
          Calculator
        </h4>
        <div id="display-container" className="display-container">
          <bdi id="display" className="display">
            {displayText}
          </bdi>
        </div>
        <ButtonContainer updateDisplay={updateDisplay} />
      </div>
    </div>
  );
}

export default App;
