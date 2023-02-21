import CSS from "csstype";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import {
  useChangePasswordMutation,
  useFetchTokenQuery,
} from "../gql/generated/schema";

const resetPasswordStyles: CSS.Properties = {
  height: "100vh",
  width: "100vw",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "center",
  backgroundColor: "#FFFFFF",
  position: "absolute",
  paddingTop: "2rem",
};

const passwordResetContainerStyles: CSS.Properties = {
  height: "100vh",
  width: "70vw",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-around",
  alignItems: "center",
  backgroundColor: "#FFFFFF",
  border: "2px solid #E2FE53",
};

const inputStyles: CSS.Properties = {
  textAlign: "center",
  borderRadius: "10px",
  width: "50rem",
  height: "3.5rem",
  border: "2px solid #EC5D5C",
  fontFamily: "Rubik",
};

const primaryButtonStyles: CSS.Properties = {
  height: "2.5rem",
  width: "15rem",
  backgroundColor: "#EC5D5C",
  border: "3px solid #EC5D5C",
  color: "#FFFFFF",
  margin: "10rem",
};

const secondaryButtonStyles: CSS.Properties = {
  height: "2.5rem",
  width: "15rem",
  border: "3px solid #EC5D5C",
};

export default function PasswordReset() {
  const { token } = useParams();

  const [credentials, setCredentials] = useState({
    email: "",
    newPassword: "",
  });

  const [serverToken, setServerToken] = useState({});

  // mutation to get the changeEmailToken
  useFetchTokenQuery({
    // how to replace hard coded email ?
    variables: { email: "ap_levy@hotmail.com" },
    onCompleted: (response) => {
      setServerToken(JSON.stringify(response.fetchToken.changePasswordToken));
    },
  });

  const [changePassword] = useChangePasswordMutation();

  // if params === serverEmailToken then display the page else display an error message / page
  const cleanServerToken = JSON.stringify(serverToken).replace(/[\\]/g, "").replace(/['"]+/g, '');
  const cleanToken = token?.replace(/[:]+/g, '')

  if (!token || cleanToken !== cleanServerToken)
    return (
      <div>
        {/* <img src={lost} alt="lost" /> */}
        <p>OOOPPS invalid token</p>
      </div>
    );

  return (
    <>
      <Header />
      <div style={resetPasswordStyles}>
        <form
          style={passwordResetContainerStyles}
          onSubmit={(e) => {
            e.preventDefault();
            changePassword({ variables: { data: credentials } })
              .then(() => {
                console.log(credentials.email, credentials.newPassword);
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
              placeholder="Email"
              value={credentials.email}
              onChange={(e) =>
                setCredentials({ ...credentials, email: e.target.value })
              }
            ></input>
          </label>
          <label htmlFor="newPassword">
            <input
              style={inputStyles}
              type="password"
              id="newPassword"
              placeholder="Nouveau mot de passe"
              value={credentials.newPassword}
              onChange={(e) =>
                setCredentials({ ...credentials, newPassword: e.target.value })
              }
            ></input>
          </label>
          <div>
            <button style={secondaryButtonStyles}>Retour</button>
            <button type="submit" style={primaryButtonStyles}>
              Valider
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
