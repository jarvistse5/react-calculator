import "./Wrapper.css";

const Wrapper = ({ className, children }) => {
  return <div className={className}>{children}</div>;
};

export default Wrapper;