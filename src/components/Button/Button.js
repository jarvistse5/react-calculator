import "./Button.css";

const Button = ({ darkmode, className, value, onClick }) => {
  return (
    <button className={[darkmode ? className + ' darkmodeBtn' : className]} onClick={onClick}>
      {value}
    </button>
  );
};

export default Button;