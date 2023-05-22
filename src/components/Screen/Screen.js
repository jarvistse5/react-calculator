import "./Screen.css";

const Screen = ({ darkmode, equation, value }) => {
  return (
    <div className={darkmode ? 'darkScreen' : 'screen'}>
        <p className="equation">{equation}</p>
        <p className="value">{value}</p>
    </div>
  );
};

export default Screen;