import { useState } from "react";
import { Link } from "react-router-dom";
import Mapado from "../assets/images/mapado_logo.png";
import SearchBar from "./SearchBar";
import IState from "../interfaces/IState";

interface HeaderProps {
  currentUrl: string;
  state: IState;
  handleChange(e: React.ChangeEvent<HTMLInputElement>): void;
}

export default function Header({
  currentUrl,
  handleChange,
  state,
}: HeaderProps) {
  const [headerWithShadow, setHeaderWithShadow] = useState(false);
  const changeNavStyle = () => {
    if (window.scrollY >= 10) {
      setHeaderWithShadow(true);
    } else {
      setHeaderWithShadow(false);
    }
  };

  window.addEventListener("scroll", changeNavStyle);

  return currentUrl !== "/" ? (
    <nav
      className={`headerStyle${headerWithShadow ? " headerWithShadow" : ""}`}
    >
      <Link to="/cities-list">
        <img src={Mapado} alt="logo" />
      </Link>

      <SearchBar
        currentUrl={currentUrl}
        state={state}
        handleChange={handleChange}
      />

      <div className="intro__subtitle">
        <div className="codrops-links">
          <div className="intro__description">
            <p>Locate, discover & share !</p>
            <div className="demos">
              <Link to="/cities-list">Accueil</Link>
              <Link to="/admin">Admin</Link>
              <Link to="/login">Connexion</Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  ) : (
    <></>
  );
}
