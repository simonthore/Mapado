import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Mapado from "../assets/images/mapado_logo.png";
import SearchBar from "./SearchBar";
import IState from "../interfaces/IState";
import { motion } from "framer-motion";
import { useGetProfileQuery, useGetCityQuery } from "../gql/generated/schema";

interface HeaderProps {
  currentUrl: string;
  state: IState;
  shouldAnimate: boolean;

  handleChange(e: React.ChangeEvent<HTMLInputElement>): void;
}

export default function Header({
  currentUrl,
  handleChange,
  state,
  shouldAnimate,
}: HeaderProps) {
  const [headerWithShadow, setHeaderWithShadow] = useState(false);
  // State qui permet de contrôler si le header doit être affiché ou nom

  const { data: currentUser, client } = useGetProfileQuery({
    errorPolicy: "ignore",
  });
  const currentUserRole = currentUser?.profile?.role;

  const changeNavStyle = () => {
    if (window.scrollY >= 10) {
      setHeaderWithShadow(true);
    } else {
      setHeaderWithShadow(false);
    }
  };

  window.addEventListener("scroll", changeNavStyle);

  const header = (
    <nav
      className={`headerStyle${headerWithShadow ? " headerWithShadow" : ""}`}
    >
      <NavLink to="/cities-list">
        <img src={Mapado} alt="logo" />
      </NavLink>
      <SearchBar
        currentUrl={currentUrl}
        state={state}
        handleChange={handleChange}
      />
      <div className="nav__description">
        <p>Locate, discover & share !</p>
        <div className="demos">
          <NavLink to="/cities-list">Accueil</NavLink>
          {(currentUserRole === "Super Administrator" ||
            currentUserRole === "City Administrator") && (
            <NavLink to="/admin">Admin</NavLink>
          )}
          <NavLink to="/login">Connexion</NavLink>
        </div>
      </div>
    </nav>
  );

  if (currentUrl === "/cities-list" && shouldAnimate) {
    return (
      <motion.nav
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          delay: 0.5,
          duration: 0.5,
        }}
        className={`headerStyle${headerWithShadow ? " headerWithShadow" : ""}`}
      >
        <NavLink to="/cities-list">
          <img src={Mapado} alt="logo" />
        </NavLink>

        <SearchBar
          currentUrl={currentUrl}
          state={state}
          handleChange={handleChange}
        />

        <div className="nav__description">
          <p>Locate, discover & share !</p>
          <div className="demos">
            <NavLink to="/cities-list">Accueil</NavLink>
            {(currentUserRole === "Super Administrator" ||
              currentUserRole === "City Administrator") && (
              <NavLink to="/admin">Admin</NavLink>
            )}
            <NavLink to="/login">Connexion</NavLink>
          </div>
        </div>
      </motion.nav>
    );
  } else if (!shouldAnimate && currentUrl !== "/") {
    return header;
  } else {
    return <></>;
  }
}
