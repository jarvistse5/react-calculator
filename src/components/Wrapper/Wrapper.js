import { useContext } from "react";
import "./Wrapper.css";
import { ThemeContext } from '../../App';

const Wrapper = ({ children }) => {
  const theme = useContext(ThemeContext);
  return <div className={`wrapper theme-${theme}`}>{children}</div>;
};

export default Wrapper;