import CSS from "csstype";
import {useState} from "react";
import login from "../assets/login.svg";
import Header from "../components/Header";
import { useCreateUserMutation } from "../gql/generated/schema";
import Card from "../components/Card";

const loginPageStyles: CSS.Properties = {
    height: "100vh",
    width: "100vw",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
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
    borderRadius: "10px",
    width: "20rem",
    height: "2.5rem",
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
    color: "#EC5D5C",
    fontWeight: 700,
};

const iconStyles: CSS.Properties = {
    height: "15rem",
    width: "auto",
};

const titleStyles: CSS.Properties = {
    fontFamily: "Rubik",
    fontWeight: 800,
    fontSize: "3rem",
    color: "#000000",
};

export default function Register() {
    const [userInfo, setUserInfo] = useState({email: "", password: ""});

    const [createUser] = useCreateUserMutation();

    return (
      <>
      <Header />
        <div style={loginPageStyles}>
            <Card customClass={"registerCard"}>
                <form
                    style={loginContainerStyles}
                    onSubmit={(e) => {
                        e.preventDefault();
                        createUser({variables: {data: userInfo}})
                            .then(() => {
                                console.log("ok");
                            })
                            .catch(console.error);
                    }}
                >
                    <label htmlFor="email">
                        <input
                            style={inputStyles}
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Adresse mail"
                            value={userInfo.email}
                            onChange={(e) =>
                                setUserInfo({...userInfo, email: e.target.value})
                            }
                        ></input>
                    </label>
                    <label htmlFor="password">
                        <input
                            style={inputStyles}
                            type="password"
                            placeholder="Mot de passe"
                            value={userInfo.password}
                            onChange={(e) =>
                                setUserInfo({...userInfo, password: e.target.value})
                            }
                        ></input>
                    </label>
                    <button type="submit" style={primaryButtonStyles}>Créer un compte</button>
                </form>
            </Card>
        </div>
        </>
    );
}
