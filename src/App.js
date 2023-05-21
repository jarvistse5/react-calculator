import Wrapper from "./components/Wrapper/Wrapper";
import Screen from "./components/Screen/Screen";
import ButtonBox from "./components/ButtonBox/ButtonBox";
import Button from "./components/Button/Button";

const btnValues = [
  [{value: "C", class: "action"}, {value: "+/-", class: "action"}, {value: "%", class: "action"}, {value: "%", class: "operator"}],
  [{value: "7", class: ""}, {value: "8", class: ""}, {value: "9", class: ""}, {value: "X", class: "operator"}],
  [{value: "4", class: ""}, {value: "5", class: ""}, {value: "6", class: ""}, {value: "-", class: "operator"}],
  [{value: "1", class: ""}, {value: "2", class: ""}, {value: "3", class: ""}, {value: "+", class: "operator"}],
  [{value: "0", class: "zero"}, {value: ".", class: ""}, {value: "=", class: "operator"}],
];

const App = () => {
  return (
    <Wrapper>
      <Screen value="0" equation="" />
      <ButtonBox>
        {
          btnValues.flat().map((btn, i) => {
            return (
              <Button
                key={i}
                className={btn.class}
                value={btn.value}
                onClick={() => {
                  console.log(`${btn} clicked!`);
                }}
              />
            );
          })
        }
      </ButtonBox>
    </Wrapper>
  );
};

export default App;