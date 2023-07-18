import { useState, FormEvent } from "react";
import { useCreateUserMutation, useUsersQuery } from "../gql/generated/schema";
import Card from "../components/Card";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";

export default function Register() {
  const [userInfo, setUserInfo] = useState({ email: "", password: "" });
  const [passwordShown, setPasswordShown] = useState(false);
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  const navigateLandingPage = () => navigate("/cities-list");

  const [createUser] = useCreateUserMutation();
  const { data: usersData } = useUsersQuery();
  const users = usersData?.users ?? [];

  const togglePassword = () => setPasswordShown(!passwordShown);

  const createNewUser = async (e: FormEvent<HTMLFormElement>) => {
    const userListEmail = (await users).map((user) => user.email);
    if (userListEmail.indexOf(userInfo.email) !== -1) {
      toast("Un compte est déjà enregistré");
    } else {
      e.preventDefault();
      toast.success("Bienvenue sur Mapado");
      await createUser({ variables: { data: userInfo } }).then(() => {
        console.log("ok");
      });
      navigateLandingPage();
    }
  };

  return (
    <>
      <Card customClass={" registerCard"}>
        <button className={"backButton"} onClick={goBack}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25">
            <path d="M24 12.001H2.914l5.294-5.295-.707-.707L1 12.501l6.5 6.5.707-.707-5.293-5.293H24v-1z" />
          </svg>
        </button>
        <form
          className={"registerContainer"}
          onSubmit={(e) => {
            createNewUser(e);
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
                setUserInfo({ ...userInfo, email: e.target.value })
              }
            ></input>
          </label>
          <label htmlFor="password">
            <input
              type={passwordShown ? "text" : "password"}
              id="password"
              placeholder="Mot de passe"
              value={userInfo.password}
              onChange={(e) =>
                setUserInfo({ ...userInfo, password: e.target.value })
              }
            ></input>
            <button
              type="button"
              onClick={togglePassword}
              style={{ color: "#EC5D5C" }}
            >
              {" "}
              {passwordShown ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </button>
          </label>
          <button type="submit" className={"tertiaryButton"}>
            Créer un compte
          </button>
        </form>
      </Card>
    </>
  );
}
