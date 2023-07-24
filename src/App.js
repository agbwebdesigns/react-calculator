import { useState } from "react";

export default function App() {
  return (
    <div className="App">
      <h1>React Calculator</h1>
      <Main />
    </div>
  );
}

function Main() {
  const [display, setDisplay] = useState([]);
  let firstNum = [];

  function handleDisplayAdd(num) {
    setDisplay((display) => [...display, num]);
  }

  function handleEqualsClick(showNum) {
    firstNum = display.join("");
    console.log(parseInt(firstNum));
    const regexNumbers = /\.*\d+\.*\d*/g;
    const regexOperator = /(x|\/|\+|-)+/g;
    const regPeriod = /\.+/g;
    const regNumberMatch = firstNum.match(regexNumbers);
    console.log(regNumberMatch[1]);
    const regOperatorMatch = firstNum.match(regexOperator);
    console.log(regOperatorMatch);
    console.log(regNumberMatch[0]);

    let firstNumberCheck = regPeriod.test(regNumberMatch[0]);
    regPeriod.lastIndex = 0;
    console.log(regNumberMatch[1]);

    let secondNumberCheck = regPeriod.test(regNumberMatch[1]);
    console.log(firstNumberCheck);
    console.log(secondNumberCheck);

    let firstNumberParsed =
      firstNumberCheck !== true
        ? parseInt(regNumberMatch[0])
        : parseFloat(regNumberMatch[0]);
    console.log(firstNumberParsed);

    let secondNumberParsed =
      secondNumberCheck !== true
        ? parseInt(regNumberMatch[1])
        : parseFloat(regNumberMatch[1]);
    console.log(secondNumberParsed);

    if (regOperatorMatch[0] === "+") console.log("+");
    let assembledEq =
      regOperatorMatch[0] === "+"
        ? (firstNumberParsed += secondNumberParsed)
        : regOperatorMatch[0] === "-"
        ? (firstNumberParsed -= secondNumberParsed)
        : regOperatorMatch[0] === "x"
        ? (firstNumberParsed *= secondNumberParsed)
        : regOperatorMatch[0] === "/"
        ? (firstNumberParsed /= secondNumberParsed)
        : null;

    console.log(assembledEq);
    setDisplay(() => [assembledEq]);
  }

  function handleClear() {
    console.log("Cleared!");
    setDisplay(() => []);
  }

  return (
    <div className="backing">
      <Display display={display} />
      <div className="buttonsections">
        <div className="numberbuttonsection">
          {Array.from({ length: 12 }, (_, i) => i + 1).map((num) => (
            <Buttons
              num={num}
              display={display}
              onDisplayAdd={handleDisplayAdd}
              onEqualsClick={handleEqualsClick}
              key={num}
            ></Buttons>
          ))}
        </div>
        <div className="functionbuttonsection">
          {Array.from({ length: 4 }, (_, i) => i + 1).map((num) => (
            <OperatorButton
              num={num}
              onOperatorSelect={handleDisplayAdd}
              display={display}
            />
          ))}
        </div>
      </div>
      <Buttons num={20} clearButtonWidth={300} onClear={handleClear}>
        Clear
      </Buttons>
    </div>
  );
}

function Display({ display }) {
  console.log(display);
  return (
    <div className="displaybox">
      <div>{display}</div>
    </div>
  );
}

function Buttons({
  clearButtonWidth,
  num,
  children,
  onDisplayAdd,
  onEqualsClick,
  onClear,
  display,
}) {
  let showNum = 0;
  num < 4
    ? (showNum = num += 6)
    : num > 3 && num < 7
    ? (showNum = num)
    : num > 6 && num < 10
    ? (showNum = num -= 6)
    : num === 10
    ? (showNum = ".")
    : num === 11
    ? (showNum = 0)
    : num === 12
    ? (showNum = "=")
    : (showNum = "");

  let equationCheck = () => {
    console.log(display);
    if (display.length === 0) return false;
    let firstNum = display.join("");
    const regexNumbers = /\d+\.*\d*/g;
    let displayTest = firstNum.match(regexNumbers);
    console.log(displayTest);
    if (displayTest.length === 2) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <button
      className="button"
      style={{ width: clearButtonWidth }}
      onClick={() => {
        num === 20
          ? onClear()
          : num !== 12
          ? onDisplayAdd(showNum)
          : equationCheck() === true && onEqualsClick(showNum);
      }}
    >
      {children}
      <p>{showNum}</p>
    </button>
  );
}

function OperatorButton({ num, onOperatorSelect, display }) {
  let showNum = 0;

  num === 1
    ? (showNum = "/")
    : num === 2
    ? (showNum = "x")
    : num === 3
    ? (showNum = "+")
    : num === 4
    ? (showNum = "-")
    : (showNum = "");

  let equationCheck = () => {
    console.log(display);
    if (display.length === 0) return false;
    let firstNum = display.join("");
    const regexOperator = /(x|\/|\+|-)+/g;
    let displayTest = firstNum.match(regexOperator);
    console.log(displayTest);
    if (displayTest === null) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <button
      className="button operatorbutton"
      onClick={() =>
        display.length > 0 && equationCheck() === true
          ? onOperatorSelect(showNum)
          : null
      }
    >
      <p>{showNum}</p>
    </button>
  );
}
