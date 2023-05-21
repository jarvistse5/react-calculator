import "./Screen.css";

const Screen = ({ equation, value }) => {
  return (
    <div className="screen">
        <p className="equation">{equation}</p>
        <p className="value">{value}</p>
    </div>
  );
};

export default Screen;