import {useState} from "react";
import login from "../assets/login.svg";
import Header from "../components/Header";
import {useCreateUserMutation} from "../gql/generated/schema";
import Card from "../components/Card";

export default function Register() {
    const [userInfo, setUserInfo] = useState({email: "", password: ""});

    const [createUser] = useCreateUserMutation();

    return (
        <>
            <Header/>
            <Card customClass={"registerCard"}>
                <form
                    className={"registerContainer"}
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
                            type="password"
                            placeholder="Mot de passe"
                            value={userInfo.password}
                            onChange={(e) =>
                                setUserInfo({...userInfo, password: e.target.value})
                            }
                        ></input>
                    </label>
                    <button type="submit" className={"tertiaryButton"}>Créer un compte</button>
                </form>
            </Card>
        </>
    );
}
