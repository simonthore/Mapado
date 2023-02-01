import CSS from "csstype";
import login from '../assets/login.svg'

const loginPageStyles: CSS.Properties = {
  height: "100vh",
  width: "100vw",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "center",
  backgroundColor: "#3270F4",
};
const loginContainerStyles: CSS.Properties = {
  height: "100vh",
  width: "70vw",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-around",
  alignItems: "center",
  backgroundColor: "#E2FE53",
};

const inputStyles: CSS.Properties = {
  textAlign: "center",
  borderRadius: "10px",
  width: "20rem",
  height: "2.5rem",
};

const primaryButtonStyles: CSS.Properties = {
  height: "2.5rem",
  width: "15rem",
  backgroundColor: "#FFFFFF",
  borderRadius: "15px",
  border: "3px solid #EC5D5C"
};
const secondaryButtonStyles: CSS.Properties = {
  height: "2.5rem",
  width: "15rem",
  borderRadius: "15px",
  border: "3px solid #EC5D5C"
};

const tertiaryButtonStyles: CSS.Properties = {
    color: "#EC5D5C",
    fontWeight: 700
}

const iconStyles: CSS.Properties = {
  height: "15rem",
  width: "auto"
}

const titleStyles: CSS.Properties = {
  fontFamily: 'Rubik',
  fontWeight: 800,
  fontSize: '3rem',
  color: '#000000',
}

export default function Login() {
  return (
    <div style={loginPageStyles}>
      <div style={loginContainerStyles}>
        <a href="/"><h1 style={titleStyles}>MAPADO</h1></a>
          <img src={login} alt="" style={iconStyles}/>
        <input
          style={inputStyles}
          type="text"
          placeholder="Nom d'utilisateur /  adresse mail"
        ></input>
        <input
          style={inputStyles}
          type="text"
          placeholder="Mot de passe"
        ></input>
        <button style={tertiaryButtonStyles}>Mot de passe oublié ?</button>
        <button style={primaryButtonStyles}>Se connecter</button>
        <button style={secondaryButtonStyles}>Créer un compte</button>
      </div>
    </div>
  );
}
