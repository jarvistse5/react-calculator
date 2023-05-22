import "./Header.css";
import moon from '../../assets/icon_moon.png';
import sun from '../../assets/icon_sun.png';

const Header = ({ darkmode, onClick }) => {
  return (
    <div className="header">
        <div className="icon-container" onClick={onClick}>
            {
                darkmode ? (
                    <img className="icon-image" src={sun} alt="darkmode"></img>
                ) : (
                    <img className="icon-image" src={moon} alt="lightmode"></img>
                )
            }
        </div>
    </div>
  );
};

export default Header;