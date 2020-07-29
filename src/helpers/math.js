/**
 * Do math from an array input
 *
 * @param {Array} input
 * @returns {number}
 */
const doMath = input => {
  const math = {
    "+": (x, y) => x + y,
    "-": (x, y) => x - y,
    "*": (x, y) => x * y,
    "/": (x, y) => x / y
  };

  let resultArr = [...input];

  if (typeof resultArr[resultArr.length - 1] !== "number") {
    resultArr.splice(-1, 1);
  }
  //console.log("Input value: ", resultArr);

  while (resultArr.indexOf("/") !== -1) {
    resultArr.splice(
      resultArr.indexOf("/") - 1,
      3,
      math["/"](
        resultArr[resultArr.indexOf("/") - 1],
        resultArr[resultArr.indexOf("/") + 1]
      )
    );
  }
  //console.log("Divide: ", resultArr);

  while (resultArr.indexOf("*") !== -1) {
    resultArr.splice(
      resultArr.indexOf("*") - 1,
      3,
      math["*"](
        resultArr[resultArr.indexOf("*") - 1],
        resultArr[resultArr.indexOf("*") + 1]
      )
    );
  }
  //console.log("Multiply: ", resultArr);

  while (resultArr.indexOf("-") !== -1) {
    resultArr.splice(
      resultArr.indexOf("-") - 1,
      3,
      math["-"](
        resultArr[resultArr.indexOf("-") - 1],
        resultArr[resultArr.indexOf("-") + 1]
      )
    );
  }
  //console.log("Subtract: ", resultArr);

  while (resultArr.indexOf("+") !== -1) {
    resultArr.splice(
      resultArr.indexOf("+") - 1,
      3,
      math["+"](
        resultArr[resultArr.indexOf("+") - 1],
        resultArr[resultArr.indexOf("+") + 1]
      )
    );
  }
  //console.log("Add => Result: ", resultArr);

  resultArr[0] = Math.round(resultArr[0] * Math.pow(10, 5)) / Math.pow(10, 5);
  return resultArr[0];
};

export default doMath;
