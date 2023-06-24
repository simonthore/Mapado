import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Mapado from "../assets/images/mapado_logo.png";
import directions from "../assets/images/directions.png";
import { buttonAnimation } from "../utils/homeButtonAnimation";

export default function Home() {
  return (
    <>
      {/*Le préfixe motion permet d'animer un élément HTML avec Framer Motion*/}
      <motion.div
        // On indique ici qu'à la sortie de la page, on joue l'animation
        exit={{ opacity: 0, top: "-100vh" }}
      >
        <header className="intro">
          <motion.div initial={{ x: "-200px" }} animate={{ x: 0 }}>
            <Link to="/">
              <img className="intro__logo" src={Mapado} alt="logo" />
            </Link>
          </motion.div>
          <div className="intro__container">
            <div className="intro__text">
              <div className="intro__main__title main-color">
                <motion.h1
                  initial={{ y: "500px" }}
                  animate={{ y: 0 }}
                  transition={{ delay: 0.5, duration: 0.5, type: "spring" }}
                >
                  Bienvenue sur Mapado
                </motion.h1>
              </div>
              <div className="intro__description">
                <motion.h2
                  initial={{ y: "500px" }}
                  animate={{ y: 0 }}
                  transition={{ delay: 0.7, duration: 0.5, type: "spring" }}
                >
                  Nous avons créé une application qui vous permet d'ajouter vos
                  coins préférés à vos villes préférées. Ou futures villes
                  préférées.
                  <br />
                  Même si c'est notre application que vous allez préférer.
                </motion.h2>
              </div>
              <motion.div
                initial="hidden"
                animate="visible"
                variants={buttonAnimation}
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="intro__go-to-app main-color"
              >
                <Link to="/cities-list">Essayer Mapado</Link>
              </motion.div>
            </div>
            <motion.img
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 2 }}
              className="intro__image"
              src={directions}
              alt="character-with-map"
            />
          </div>
        </header>
      </motion.div>
    </>
  );
}
