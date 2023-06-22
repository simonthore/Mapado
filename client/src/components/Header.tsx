import {useEffect, useState} from "react";
import {NavLink} from "react-router-dom";
import Mapado from "../assets/images/mapado_logo.png";
import SearchBar from "./SearchBar";
import IState from "../interfaces/IState";
import {motion} from "framer-motion";

interface HeaderProps {
    currentUrl: string;
    state: IState;

    handleChange(e: React.ChangeEvent<HTMLInputElement>): void;
}

export default function Header({currentUrl, handleChange, state}: HeaderProps) {
    const [headerWithShadow, setHeaderWithShadow] = useState(false);
    // State qui permet de contrôler si le header doit être affiché ou nom
    const [shouldAnimate, setShouldAnimate] = useState(true);

    const changeNavStyle = () => {
        if (window.scrollY >= 10) {
            setHeaderWithShadow(true);
        } else {
            setHeaderWithShadow(false);
        }
    };

    window.addEventListener("scroll", changeNavStyle);

    useEffect(() => {
        if (shouldAnimate && currentUrl === "/cities-list") {
            setTimeout(() => {
                setShouldAnimate(false);
            }, 3000);
        }
        if (currentUrl === "/") {
            setShouldAnimate(true);
        }
    }, [currentUrl]);

    const header =
        <nav className={`headerStyle${headerWithShadow ? " headerWithShadow" : ""}`}>
            <NavLink to="/cities-list">
                <img src={Mapado} alt="logo"/>
            </NavLink>

            <SearchBar currentUrl={currentUrl} state={state} handleChange={handleChange}/>
            <div className="nav__description">
                <p>Locate, discover & share !</p>
                <div className="demos">
                    <NavLink to="/cities-list">Accueil</NavLink>
                    <NavLink to="/admin">Admin</NavLink>
                    <NavLink to="/login">Connexion</NavLink>
                </div>
            </div>
        </nav>

    return currentUrl !== "/" && currentUrl !== "/cities-list" ? ( // Si la route est '/' ou '/cities-list' on n'affiche pas le header sans animation
        header
    ) : currentUrl === "/cities-list" && shouldAnimate ? ( // Si la route est '/cities-list' et que shouldAnimate est à true, on affiche le header avec une animation. Par défaut shouldAnimate est à true et passe à false avec le useEffect.
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
                <img src={Mapado} alt="logo"/>
            </NavLink>

            <SearchBar currentUrl={currentUrl} state={state} handleChange={handleChange}/>

            <div className="nav__description">
                <p>Locate, discover & share !</p>
                <div className="demos">
                    <NavLink to="/cities-list">Accueil</NavLink>
                    <NavLink to="/admin">Admin</NavLink>
                    <NavLink to="/login">Connexion</NavLink>
                </div>
            </div>
        </motion.nav>
    ) : currentUrl === "/cities-list" && !shouldAnimate ? ( // Si souldAnimate est à false, on affiche un header sans animation. C'est pour prévenir l'animation à chaque fois qu'on retourne sur la route 'cities-list'
        header
    ) : (
        <></>
    );
}
