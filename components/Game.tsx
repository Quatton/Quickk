import React, { MouseEventHandler, useEffect, useState } from "react";
type Props = {};

type ButtonClickHandler = (
  e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  key: number
) => void;

export default function Game({}: Props) {
  const numberRange = 10;
  const numberLength = 9;
  const goalRange = 100;
  const [initialNumbers, setInitialNumbers] = useState([0]);
  const [numbers, setNumbers] = useState([0]);
  const [goal, setGoal] = useState(0);
  const [current, setCurrent] = useState({
    number1: "0",
    op: "",
    number2: "",
  });
  const [number1, setNumber1] = useState(-1);
  const [number2, setNumber2] = useState(-1);
  const [selectedOp, setSelectedOp] = useState(-1);
  const [removed, setRemoved] = useState([-1]);
  const ops = ["+", "-", "*", "/"];

  useEffect(() => {
    setNumbers(initialNumbers);
    setGoal(Math.floor(Math.random() * goalRange) + 1);
  }, [initialNumbers]);

  useEffect(() => {
    generateNumbers();
  }, []);

  const generateNumbers = () => {
    setInitialNumbers(
      Array.from(
        { length: numberLength },
        () => Math.floor(Math.random() * numberRange) + 1
      )
    );
  };

  const reset = () => {
    setCurrent({
      number1: "0",
      op: "",
      number2: "",
    });
    setNumber1(-1);
    setNumber2(-1);
    setSelectedOp(-1);
  };

  const newGameHandler: MouseEventHandler<HTMLButtonElement> = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    reset();
    setRemoved([-1]);
    generateNumbers();
  };

  const submitHandler: MouseEventHandler<HTMLButtonElement> = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (goal === parseInt(current.number1) && removed.length === numberLength) {
      alert("You win! Press New Game");
    }
  };

  const resetAllHandler: MouseEventHandler<HTMLButtonElement> = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    reset();
    setRemoved([-1]);
    setNumbers(initialNumbers);
  };

  const resetHandler: MouseEventHandler<HTMLButtonElement> = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    reset();
  };

  const evaluateHandler: MouseEventHandler<HTMLButtonElement> = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (number1 >= 0 && number2 >= 0 && selectedOp >= 0) {
      if (selectedOp === 4 && current.number2 === "0") return;
      const currentNumbers = [...numbers];
      currentNumbers[number1] = eval(Object.values(current).join(""));
      setNumbers(currentNumbers);
      setRemoved([...removed, number2]);
      reset();
    }
  };

  const numberClickHandler: ButtonClickHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    key: number
  ) => {
    if (removed.includes(key)) return;
    const target = e.target as HTMLButtonElement;
    if (selectedOp < 0) {
      setNumber1(key);
      setCurrent({ ...current, number1: target.value });
    } else {
      if (key !== number1) setNumber2(key);
      setCurrent({ ...current, number2: target.value });
    }
  };

  const opClickHandler: ButtonClickHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    key: number
  ) => {
    const target = e.target as HTMLButtonElement;
    if (number1 >= 0 && number2 < 0) {
      setSelectedOp(key);
      setCurrent({ ...current, op: target.value });
    }
  };

  return (
    <div className="floating bg-slate-600 w-80 rounded-lg flex flex-col p-2 gap-2">
      <div className={`flex bg-orange-500 screen`}>
        <span className="bg-orange-700 rounded-l center font-bold py-2 px-4 text-lg text-violet-50">
          Goal
        </span>
        <span className="center text-2xl text-center w-full italic">
          {goal}
        </span>
      </div>
      <div
        className={`italic center bg-teal-500 screen row-span-2 text-6xl h-36`}
      >
        {Object.values(current).join("")}
      </div>
      <div className="grid grid-cols-4 grid-rows-5 gap-2">
        <button
          onClick={newGameHandler}
          className="button newgame-button col-span-2"
        >
          NEW GAME
        </button>

        <button
          onClick={resetAllHandler}
          className="button primary-button col-span-1"
        >
          CE
        </button>

        <button onClick={resetHandler} className="button primary-button">
          C
        </button>

        {numbers.map((number, i) => (
          <button
            onClick={(e) => numberClickHandler(e, i)}
            key={i}
            className={
              number1 === i || number2 === i
                ? "button number-button opacity-40"
                : removed.includes(i)
                ? "button number-button opacity-0"
                : "button number-button"
            }
            value={number}
          >
            {number}
          </button>
        ))}

        {ops.map((op, i) => (
          <button
            onClick={(e) => opClickHandler(e, i)}
            key={i}
            className={
              selectedOp === i
                ? "button operator-button opacity-40"
                : "button operator-button"
            }
            value={op}
          >
            {op}
          </button>
        ))}

        <button
          onClick={evaluateHandler}
          className="button primary-button row-start-2 row-end-5 col-start-4"
        >
          =
        </button>
      </div>

      <button
        onClick={submitHandler}
        className="h-20 button submit-button text-2xl"
      >
        Submit
      </button>
    </div>
  );
}
