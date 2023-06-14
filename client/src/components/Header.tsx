import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, redirect, useNavigate } from "react-router-dom";
import Mapado from "../assets/images/mapado_logo.png";
import { useGetProfileQuery, useLogoutMutation } from "../gql/generated/schema";

export default function Header() {
  const [headerWithShadow, setHeaderWithShadow] = useState(false);

  const [logout] = useLogoutMutation();

  const navigate = useNavigate();
  const navigateHome = () => navigate("/");

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

  return (
    <nav
      className={`headerStyle${headerWithShadow ? " headerWithShadow" : ""}`}
    >
      <Link to="/">
        <img src={Mapado} />
      </Link>

      <div className="intro__subtitle">
      <div className="codrops-links">
          <div className="intro__description">
            <p>Locate, discover & share !</p>
            <div className="demos">
              <Link to="/cities-list">Accueil</Link>
              {(currentUserRole === "Super Administrator" ||
                      currentUserRole === "City Administrator") && (
                      <Link to="/admin">
                        Admin
                      </Link>
                      )}
              {currentUser ? (
                <button
                  onClick={async () => {
                    await logout();
                    await client.resetStore();
                    navigateHome();
                  }}
                >
                  {" "}
                  Se déconnecter
                </button>
              ) : (
                <Link to="/login">Connexion</Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
