import "./header.css";
import { Link } from "react-router-dom";
import Logo from "../../assets/Logo.svg";
import Avatar from "../../assets/avatar.svg";
import Logout from "../../assets/logout.svg";
import EditUser from "../Editar_Usuario/index";
import { useState } from "react";
import { getItem } from "../../utils/storage";

function Header() {
  const [isEditVisible, setIsEditVisible] = useState(false);
  const userNome = getItem("userNome");

  function handleLogout() {
    localStorage.clear();
  }

  return (
    <div>
      {isEditVisible ? <EditUser visible={setIsEditVisible} /> : null}
      <header className="header_home dflex dflex--column">
        <div className="header_content-home dflex flex--center-evenly">
          <img src={Logo} className="header_logo dflex" alt="App Logo" />
          <div className="header_profile dflex dflex--row flex--center-center">
            <img
              src={Avatar}
              className="avatar header--img"
              alt="Profile"
              onClick={() => setIsEditVisible(true)}
            />
            <span className="header_username">{userNome}</span>
            <Link to={"/"}>
              <button className="logout" onClick={handleLogout}>
                <img src={Logout} alt="Logout" />
              </button>
            </Link>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Header;
