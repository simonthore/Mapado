import CSS from "csstype";
import {useState} from "react";
import {Navigate} from "react-router-dom";
import toast from "react-hot-toast";
import login from "../assets/login.svg";
import {useGetProfileQuery, useLoginMutation} from "../gql/generated/schema";

const loginPageStyles: CSS.Properties = {
    height: "100vh",
    width: "100vw",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 2000 1500'%3E%3Cdefs%3E%3Ccircle stroke='%23173472' vector-effect='non-scaling-stroke' id='a' fill='none' stroke-width='5' r='315'/%3E%3Cuse id='f' href='%23a' stroke-dasharray='100 100 100 9999'/%3E%3Cuse id='b' href='%23a' stroke-dasharray='250 250 250 250 250 9999'/%3E%3Cuse id='e' href='%23a' stroke-dasharray='1000 500 1000 500 9999'/%3E%3Cuse id='g' href='%23a' stroke-dasharray='1500 9999'/%3E%3Cuse id='h' href='%23a' stroke-dasharray='2000 500 500 9999'/%3E%3Cuse id='j' href='%23a' stroke-dasharray='800 800 800 800 800 9999'/%3E%3Cuse id='k' href='%23a' stroke-dasharray='1200 1200 1200 1200 1200 9999'/%3E%3Cuse id='l' href='%23a' stroke-dasharray='1600 1600 1600 1600 1600 9999'/%3E%3C/defs%3E%3Cg transform='translate(1000 750)' %3E%3Cg transform='rotate(0 0 0)' %3E%3Ccircle fill='%23173472' r='10'/%3E%3Cg transform='rotate(0 0 0)'%3E%3Cuse href='%23f' transform='scale(.1) rotate(50 0 0)' /%3E%3Cuse href='%23f' transform='scale(.2) rotate(100 0 0)' /%3E%3Cuse href='%23f' transform='scale(.3) rotate(150 0 0)' /%3E%3C/g%3E%3Cg transform='rotate(0 0 0)'%3E%3Cuse href='%23b' transform='scale(.4) rotate(200 0 0)' /%3E%3Cuse href='%23z' transform='scale(.5) rotate(250 0 0)' /%3E%3C/g%3E%3Cg id='z' transform='rotate(0 0 0)'%3E%3Cg transform='rotate(0 0 0)'%3E%3Cuse href='%23b'/%3E%3Cuse href='%23b' transform='scale(1.2) rotate(90 0 0)' /%3E%3Cuse href='%23b' transform='scale(1.4) rotate(60 0 0)' /%3E%3Cuse href='%23e' transform='scale(1.6) rotate(120 0 0)' /%3E%3Cuse href='%23e' transform='scale(1.8) rotate(30 0 0)' /%3E%3C/g%3E%3C/g%3E%3Cg id='y' transform='rotate(0 0 0)'%3E%3Cg transform='rotate(0 0 0)'%3E%3Cuse href='%23e' transform='scale(1.1) rotate(20 0 0)' /%3E%3Cuse href='%23g' transform='scale(1.3) rotate(-40 0 0)' /%3E%3Cuse href='%23g' transform='scale(1.5) rotate(60 0 0)' /%3E%3Cuse href='%23h' transform='scale(1.7) rotate(-80 0 0)' /%3E%3Cuse href='%23j' transform='scale(1.9) rotate(100 0 0)' /%3E%3C/g%3E%3C/g%3E%3Cg transform='rotate(0 0 0)'%3E%3Cg transform='rotate(0 0 0)'%3E%3Cg transform='rotate(0 0 0)'%3E%3Cuse href='%23h' transform='scale(2) rotate(60 0 0)'/%3E%3Cuse href='%23j' transform='scale(2.1) rotate(120 0 0)'/%3E%3Cuse href='%23j' transform='scale(2.3) rotate(180 0 0)'/%3E%3Cuse href='%23h' transform='scale(2.4) rotate(240 0 0)'/%3E%3Cuse href='%23j' transform='scale(2.5) rotate(300 0 0)'/%3E%3C/g%3E%3Cuse href='%23y' transform='scale(2) rotate(180 0 0)' /%3E%3Cuse href='%23j' transform='scale(2.7)'/%3E%3Cuse href='%23j' transform='scale(2.8) rotate(45 0 0)'/%3E%3Cuse href='%23j' transform='scale(2.9) rotate(90 0 0)'/%3E%3Cuse href='%23k' transform='scale(3.1) rotate(135 0 0)'/%3E%3Cuse href='%23k' transform='scale(3.2) rotate(180 0 0)'/%3E%3C/g%3E%3Cuse href='%23k' transform='scale(3.3) rotate(225 0 0)'/%3E%3Cuse href='%23k' transform='scale(3.5) rotate(270 0 0)'/%3E%3Cuse href='%23k' transform='scale(3.6) rotate(315 0 0)'/%3E%3Cuse href='%23k' transform='scale(3.7)'/%3E%3Cuse href='%23k' transform='scale(3.9) rotate(75 0 0)'/%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
    backgroundColor: "#E2FE53",
    backgroundAttachment: "fixed",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
};

const loginContainerStyles: CSS.Properties = {
    height: "100vh",
    width: "70vw",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
};

const inputStyles: CSS.Properties = {
    textAlign: "center",
    borderRadius: "20px",
    width: "20rem",
    height: "2.5rem",
    border: "20px solid #E2FE53",
    boxSizing: "content-box"
};

const primaryButtonStyles: CSS.Properties = {
    height: "2.5rem",
    width: "15rem",
    backgroundColor: "#FFFFFF",
    borderRadius: "15px",
    border: "3px solid #EC5D5C",
};
const secondaryButtonStyles: CSS.Properties = {
    height: "2.5rem",
    width: "15rem",
    borderRadius: "15px",
    border: "3px solid #EC5D5C",
};

const tertiaryButtonStyles: CSS.Properties = {
    height: "2.5rem",
    width: "15rem",
    borderRadius: "15px",
    border: "3px solid #EC5D5C",
    backgroundColor: "#EC5D5C",
    color: "white",
};

const iconStyles: CSS.Properties = {
    height: "15rem",
    width: "auto",
};

const titleStyles: CSS.Properties = {
    fontFamily: "Rubik",
    fontWeight: 800,
    fontSize: "3rem",
    color: "#EC5D5C",
};

export default function Login() {
    const [credentials, setCredentials] = useState({email: "", password: ""});

    const [login] = useLoginMutation();

    const {data: currentUser, refetch, client} = useGetProfileQuery();

    return (
        <div style={loginPageStyles}>
            {currentUser && <Navigate to="/" replace={false}/>}

            <form
                style={loginContainerStyles}
                onSubmit={(e) => {
                    e.preventDefault();
                    login({variables: {data: credentials}})
                        .then(() => {
                            client.resetStore();
                        })
                        .catch((error) => {
                            toast.error("Invalid credentials", {
                                style: {
                                    border: "3px solid #EC5D5C",
                                    padding: "4rem",
                                    color: "#EC5D5C",
                                },
                                iconTheme: {
                                    primary: "#EC5D5C",
                                    secondary: "#FFFFFF",
                                },
                            });
                        });
                }}
            >
                <a href="/">
                    <h1 style={titleStyles}>MAPADO</h1>
                </a>
                {/* <img src={login} alt="" style={iconStyles} /> */}
                <label htmlFor="email">
                    <input
                        style={inputStyles}
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Adresse mail"
                        value={credentials.email}
                        onChange={(e) =>
                            setCredentials({...credentials, email: e.target.value})
                        }
                    ></input>
                </label>
                <label htmlFor="password">
                    <input
                        style={inputStyles}
                        type="password"
                        placeholder="Mot de passe"
                        value={credentials.password}
                        onChange={(e) =>
                            setCredentials({...credentials, password: e.target.value})
                        }
                    ></input>
                </label>
                <button style={tertiaryButtonStyles}>Mot de passe oublié ?</button>
                <button type="submit" style={primaryButtonStyles}>
                    Se connecter
                </button>
                <button style={primaryButtonStyles}>Créer un compte</button>
            </form>
        </div>
    );
}
