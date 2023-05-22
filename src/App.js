import Wrapper from "./components/Wrapper/Wrapper";
import Screen from "./components/Screen/Screen";
import ButtonBox from "./components/ButtonBox/ButtonBox";
import Button from "./components/Button/Button";
import React, { useState } from "react";

const App = () => {

  let [calc, setCalc] = useState({
    num1: null,
    sign: "",
    num2: null,
    equation: "",
    ans: 0,
    reset: 0,
  });

  const calcalate = (num1, num2, sign) => {
    if (num1 !== null && num2 !== null && sign) {
      if (sign === '+') {
        return Number(num1) + Number(num2);
      } else if (sign === '-') {
        return Number(num1) - Number(num2);
      } else if (sign === 'x') {
        return Number(num1) * Number(num2);
      } else if (sign === '/') {
        return +(Math.round((Number(num1) / Number(num2)) + "e+8") + "e-8");
      }
      return 0;
    } else if (num1 !== null) {
      return Number(num1);
    } else {
      return 0;
    }
  }

  const numClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;
    console.log(calc);
    if (calc.reset) {
      setCalc({
        num1: value,
        sign: "",
        num2: 0,
        equation: value,
        ans: calc.ans,
        reset: 0,
      });
    } else {
      setCalc({
        ...calc,
        num1: calc.sign === '' ? (calc.num1 === null ? value : calc.num1 += value) : calc.num1,
        num2: calc.sign !== '' ? (calc.num2 === null ? value : calc.num2 += value) : calc.num2,
        equation: calc.equation += value,
      });
    }
  }

  const signClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;
    if (calc.num1 !== null && calc.num2 !== null && calc.sign) {
      let ans = calcalate(calc.num1, calc.num2, calc.sign);
      setCalc({
        ...calc,
        reset: 0,
        num1: ans,
        num2: null,
        sign: value,
        equation: ans + ' ' + value + ' ',
        ans: ans,
      });
    } else if (calc.reset) {
      setCalc({
        ...calc,
        num1: calc.num1 === null ? calc.ans : calc.num1,
        sign: value,
        equation: calc.num1 === null ? calc.ans + ' ' + value + ' ' : calc.equation + ' ' + value + ' ',
        reset: 0,
      });
    } else if (calc.num1 !== null && calc.sign && calc.num2 === null) {
      setCalc({
        ...calc,
        sign: value,
        equation: calc.num1 + ' ' + value + ' ',
      });
    } else {
      setCalc({
        ...calc,
        num1: calc.num1 === null ? calc.ans : calc.num1,
        sign: value,
        equation: calc.num1 === null ? calc.ans + ' ' + value + ' ' : calc.equation + ' ' + value + ' ',
      });
    }
  }

  const resetClickHandler = (e) => {
    e.preventDefault();
    setCalc({
      num1: null,
      sign: "",
      num2: null,
      equation: "",
      ans: 0
    });
  }

  const equalClickHandler = (e) => {
      e.preventDefault();

      let ans = calcalate(calc.num1, calc.num2, calc.sign)
      if (calc.num1 !== null && calc.num2 !== null && calc.sign) {
        setCalc({
          ...calc,
          num1: null,
          num2: null,
          sign: "",
          ans: ans,
          reset: 1,
        });
      } else if (calc.num1 !== null) {
        setCalc({
          ...calc,
          ans: ans,
        });
      }
  }

  const btnValues = [
    [
      {value: "C", class: "action", click: resetClickHandler},
      {value: "+/-", class: "action"},
      {value: "%", class: "action"},
      {value: "/", class: "operator", click: signClickHandler}
    ],
    [
      {value: 7, class: "", click: numClickHandler}, 
      {value: 8, class: "", click: numClickHandler}, 
      {value: 9, class: "", click: numClickHandler}, 
      {value: "x", class: "operator", click: signClickHandler}
    ],
    [
      {value: 4, class: "", click: numClickHandler}, 
      {value: 5, class: "", click: numClickHandler}, 
      {value: 6, class: "", click: numClickHandler}, 
      {value: "-", class: "operator", click: signClickHandler}
    ],
    [
      {value: 1, class: "", click: numClickHandler}, 
      {value: 2, class: "", click: numClickHandler}, 
      {value: 3, class: "", click: numClickHandler}, 
      {value: "+", class: "operator", click: signClickHandler}
    ],
    [
      {value: 0, class: "zero", click: numClickHandler}, 
      {value: ".", class: ""}, 
      {value: "=", class: "operator", click: equalClickHandler}
    ],
  ];


  return (
    <Wrapper>
      <Screen value={calc.ans} equation={calc.equation} />
      <ButtonBox>
        {
          btnValues.flat().map((btn, i) => {
            return (
              <Button
                key={i}
                className={btn.class}
                value={btn.value}
                onClick={btn.click}
              />
            );
          })
        }
      </ButtonBox>
    </Wrapper>
  );
};

export default App;