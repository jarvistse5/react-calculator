import { useContext } from "react";
import { ThemeContext } from "../../App";
import "./Button.css";

const Button = ({ className, value, onClick }) => {
  const theme = useContext(ThemeContext);
  return (
    <button className={`${className} theme-${theme}`} onClick={onClick}>
      {value}
    </button>
  );
};

export default Button;