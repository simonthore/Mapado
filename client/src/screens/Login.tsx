import CSS from "csstype";
import {useState} from "react";
import {Navigate} from "react-router-dom";
import toast from "react-hot-toast";
import login from "../assets/login.svg";
import {useGetProfileQuery, useLoginMutation} from "../gql/generated/schema";
import Card from "../components/Card";
import {useNavigate} from "react-router";

const loginPageStyles: CSS.Properties = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundAttachment: "fixed",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
};

const loginContainerStyles: CSS.Properties = {
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
    border: "3px solid #173472",
    boxSizing: "content-box",
};

const primaryButtonStyles: CSS.Properties = {
    height: "2.5rem",
    width: "15rem",
    backgroundColor: "#FFFFFF",
    borderRadius: "15px",
    border: "3px solid #173472",
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
    border: "3px solid #173472",
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
    let navigate = useNavigate();

    const [login] = useLoginMutation();

    const {data: currentUser, refetch, client} = useGetProfileQuery();

    function register() {
        console.log("hello")
        navigate("/register", {replace: false});
    }

    return (
        <div style={loginPageStyles}>
            {currentUser && <Navigate to="/" replace={false}/>}
            <Card customClass={"registerCard"}>
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
                    <div style={{display: "flex", flexDirection: "column", gap: "2rem", alignItems: "center"}}>
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
                        <button type="submit" style={tertiaryButtonStyles}>
                            Se connecter
                        </button>
                    </div>
                    <p style={{color: "#173472", fontWeight: 600}}>Mot de passe oublié ? <a href={"#"}>Cliquez ici !</a>
                    </p>
                </form>
                <div>
                    <p style={{color: "white", fontWeight: 600}}>Pas encore de compte Mapado ? </p>
                    <button style={tertiaryButtonStyles} onClick={register}>Créer un compte
                    </button>
                </div>
            </Card>

        </div>
    );
}
