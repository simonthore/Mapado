import { Link } from "react-router-dom";
import Mapado from "../assets/images/mapado_logo.png";
import directions from "../assets/images/directions.png";

export default function Home() {
  return (
    <>
      <div id="container">
        <header className="intro">
          <Link to="/">
            <img className="intro__logo" src={Mapado} alt="logo" />
          </Link>
          <div className="intro__container">
            <div className="intro__text">
              <h1 className="intro__main__title main-color">
                Bienvenue sur Mapado
              </h1>
              <h2 className="intro__description main-color">
                Nous avons créé une application qui vous permet d'ajouter vos
                coins préférés à vos villes préférées. Ou futures villes
                préférées. Même si c'est notre application que vous allez
                préférer.
              </h2>
              <Link className="intro__go-to-app main-color" to="/cities-list">
                Essayer Mapado
              </Link>
            </div>
            <img
              className="intro__image"
              src={directions}
              alt="character-with-map"
            />
          </div>
        </header>
      </div>
    </>
  );
}