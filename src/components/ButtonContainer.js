import React, { useState } from "react";

import doMath from "../helpers/math";

const BUTTONS = [
  { id: "zero", value: "0", type: "number" },
  { id: "one", value: "1", type: "number" },
  { id: "two", value: "2", type: "number" },
  { id: "three", value: "3", type: "number" },
  { id: "four", value: "4", type: "number" },
  { id: "five", value: "5", type: "number" },
  { id: "six", value: "6", type: "number" },
  { id: "seven", value: "7", type: "number" },
  { id: "eight", value: "8", type: "number" },
  { id: "nine", value: "9", type: "number" },
  { id: "decimal", value: ".", type: "number" },
  { id: "pos-neg", value: "+/-", type: "number" },
  { id: "add", value: "+", type: "operator" },
  { id: "subtract", value: "-", type: "operator" },
  { id: "divide", value: "/", type: "operator" },
  { id: "multiply", value: "*", type: "operator" },
  { id: "clear", value: "AC", type: "memory" },
  { id: "cancel-entry", value: "CE", type: "memory" },
  { id: "equal", value: "=", type: "equal" }
];

export default function ButtonContainer({ updateDisplay }) {
  const [rawNum, setRawNum] = useState("0");
  const [lastInputType, setLastInputType] = useState("number");
  const [array, setArray] = useState([]);

  const handleClick = (type, value) => {
    const lastRaw = rawNum;
    const lastArr = [...array];
    const lastInput = lastInputType;
    const isEmptyArr = Boolean(lastArr.length === 0);
    const isEmpty = Boolean(lastRaw === "0");
    const poppedArray = [...array].slice(0, -1);

    switch (type) {
      case "number":
        switch (value) {
          case ".":
            if (!/\./.test(lastRaw)) {
              updateDisplay(
                lastArr,
                (lastRaw + value).replace(/^0+(?=\d)/, "")
              );

              setRawNum(lastRaw + value);
              setLastInputType(type);
            }
            break;
          case "+/-":
            if (!isEmpty) {
              const posneg = String(Number(lastRaw) * -1);
              updateDisplay(lastArr, posneg);

              setRawNum(posneg);
              setLastInputType(type);
            }
            break;
          default:
            updateDisplay(lastArr, (lastRaw + value).replace(/^0+(?=\d)/, ""));

            setRawNum(lastRaw + value);
            setLastInputType(type);
        }
        break;
      case "operator":
        switch (lastInput) {
          case "operator":
            updateDisplay(poppedArray, value);

            setArray([...poppedArray, value]);
            break;
          case "memory":
            if (isEmpty) {
              if (typeof lastArr[lastArr.length - 1] === "number") {
                updateDisplay([...lastArr], value);

                setLastInputType(type);
                setArray([...lastArr, value]);
              } else {
                updateDisplay(poppedArray, value);

                setLastInputType(type);
                setArray([...poppedArray, value]);
              }
              if (isEmptyArr) {
                updateDisplay([Number("0")], value);

                setLastInputType(type);
                setArray([Number("0"), value]);
              }
            } else {
              updateDisplay([...lastArr, Number(lastRaw)], value);

              setRawNum("0");
              setLastInputType(type);
              setArray([...lastArr, Number(lastRaw), value]);
            }
            break;
          default:
            updateDisplay([...lastArr, Number(lastRaw)], value);

            setRawNum("0");
            setLastInputType(type);
            setArray([...lastArr, Number(lastRaw), value]);
        }
        break;
      case "memory":
        switch (value) {
          case "AC":
            updateDisplay([], "0");

            setRawNum("0");
            setLastInputType(type);
            setArray([]);
            break;
          case "CE":
            if (!isEmpty) {
              updateDisplay(lastArr, isEmptyArr ? "0" : "");

              setRawNum("0");
              setLastInputType(type);
            } else {
              if (!isEmptyArr) {
                if (typeof lastArr[lastArr.length - 1] === "number") {
                  updateDisplay(
                    poppedArray,
                    poppedArray.length === 0 ? "0" : ""
                  );

                  setRawNum("0");
                  setLastInputType(type);
                  setArray(poppedArray);
                } else {
                  updateDisplay(
                    [...lastArr].slice(0, -2),
                    lastArr[lastArr.length - 2]
                  );

                  setRawNum(String(lastArr[lastArr.length - 2]));
                  setLastInputType(type);
                  setArray([...lastArr].slice(0, -2));
                }
              }
            }
            break;
          default:
        }
        break;
      case "equal":
        if (lastInput !== "equal") {
          const result = doMath(
            isEmpty && !isEmptyArr
              ? [...lastArr]
              : [...lastArr, Number(lastRaw)]
          );
          updateDisplay([], String(result));

          setRawNum(String(result));
          setLastInputType(type);
          setArray([]);
        }
        break;
      default:
    }
  };

  return (
    <div id="button-container" className="button-container">
      {BUTTONS.map(button => (
        <button
          id={button.id}
          className={`btn ${button.id}`}
          type="button"
          key={button.id}
          name={button.id}
          value={button.value}
          onClick={e => handleClick(button.type, e.target.value)}
        >
          {button.value}
        </button>
      ))}
    </div>
  );
}
