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
    if (num1 !== null && num1.toString().includes('%')) {
      num1 = Number(num1.toString().replace('%', '')) / Math.pow(100, 1);
    }
    if (num2 !== null && num2.toString().includes('%')) {
      num2 = Number(num2.toString().replace('%', '')) / Math.pow(100, 1);
    }

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

  const displayNum2 = (num2) => {
    let display = 0;
    if (num2.toString().includes('-')) {
      display = '(' + num2 + ')';
    } else {
      display = num2;
    }
    return display;
  }

  const numClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;

    if (calc.reset) {
      setCalc({
        num1: value,
        sign: "",
        num2: 0,
        equation: value,
        ans: calc.ans,
        reset: 0,
      });
    } else if (calc.sign === '') {
      if (calc.num1 === null || !calc.num1.toString().includes('%')) {
        let newNum1 = calc.num1 === null ? value : (
          calc.num1 === '-0' ? '-' + value : (
            calc.num1 === '0' ? value : calc.num1 + value
          )
        );
        setCalc({
          ...calc,
          num1: newNum1,
          equation: newNum1,
        });
      }
    } else {
      if (calc.num2 === null || !calc.num2.toString().includes('%')) {
        let newNum2 = calc.num2 === null ? value : (
          calc.num2 === '-0' ? '-' + value : (
            calc.num2 === '0' ? value : calc.num2 + value
          )
        );
        setCalc({
          ...calc,
          num2: newNum2,
          equation: calc.num1 + ' ' + calc.sign + ' ' + displayNum2(newNum2),
        });
      }
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

  const dotClickHandler = (e) => {
    e.preventDefault();

    if (calc.sign) {
      if (calc.num2 === null || (!calc.num2.toString().includes(".") && !calc.num2.toString().includes("%"))) {
        let newNum2 = calc.num2 === null ? "0." : calc.num2 + '.';
        setCalc({
          ...calc,
          num2: newNum2,
          equation: calc.num1 + ' ' + calc.sign + ' ' + displayNum2(newNum2),
        });
      }
    } else {
      if (calc.num1 === null || (!calc.num1.toString().includes(".") && !calc.num1.toString().includes("%"))) {
        let newNum1 = calc.num1 === null ? "0." : calc.num1 + '.';
        setCalc({
          ...calc,
          num1: newNum1,
          equation: newNum1,
          reset: 0,
        });
      }
    }
  }

  const percentClickHandler = (e) => {
    e.preventDefault();

    if (calc.sign) {
      if (calc.num2 === null || !calc.num2.toString().includes("%")) {
        let newNum2 = calc.num2 === null ? '0%' : calc.num2 + '%';
        setCalc({
          ...calc,
          num2: newNum2,
          equation: calc.num1 + ' ' + calc.sign + ' ' + displayNum2(newNum2),
        });
      }
    } else {
      if (calc.num1 === null || !calc.num1.toString().includes("%")) {
        let newNum1 = calc.num1 === null ? calc.ans + '%' : calc.num1 + '%';
        setCalc({
          ...calc,
          num1: newNum1,
          equation: newNum1,
          reset: 0,
        });
      }
    }
  }

  const invertClickHandler = (e) => {
    e.preventDefault();

    if (calc.sign === '') {
      let newNum1 = calc.num1 === null ? '-' + calc.ans : (
        calc.num1.toString().includes('-') ? 
        calc.num1.toString().replace('-', '') : 
        '-' + calc.num1
      );
      setCalc({
        ...calc,
        num1: newNum1,
        equation: newNum1,
        reset: 0,
      });
    } else {
      let newNum2 = 0;
      if (calc.num2 === null) {
        newNum2 = '-' + 0;
      } else if (calc.num2.toString().includes('-')) {
        newNum2 = calc.num2.toString().replace('-', '');
      } else {
        newNum2 = '-' + calc.num2;
      }

      setCalc({
        ...calc,
        num2: newNum2,
        equation: calc.num1 + ' ' + calc.sign + ' ' + displayNum2(newNum2),
      });
    }
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
      {value: "+/-", class: "action", click: invertClickHandler},
      {value: "%", class: "action", click: percentClickHandler},
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
      {value: ".", class: "", click: dotClickHandler}, 
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