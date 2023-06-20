import { useState } from "react";
import { useSendPasswordEmailMutation } from "../gql/generated/schema";
import Header from "../components/Header";
import Card from "../components/Card";
import toast from "react-hot-toast";

export default function PasswordReset() {
  const [email, setEmail] = useState({
    email: "",
  });

  const [sendEmail] = useSendPasswordEmailMutation();
  return (
    <>
      <Card customClass={"emailPasswordCard"}>
        <form
          className={"emailPasswordContainer"}
          onSubmit={(e) => {
            e.preventDefault();
            sendEmail({ variables: { data: email } })
              .then(() => {
                console.log("ok");
              })
              .catch(console.error);
          }}
        >
          <p>
            Saissiez votre email. Vous y recevrez un lien permettant de modifier
            votre mot de passe.
          </p>
          <label htmlFor="email">
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              value={email.email}
              onChange={(e) => setEmail({ email: e.target.value })}
            ></input>
          </label>
          <div>
            <button className={"primaryButton"}>Retour</button>
            <button
              type="submit"
              className={"tertiaryButton"}
              onClick={() =>
                toast(
                  "Veuillez vérifier votre compte email pour créer un nouveau mot de passe",
                  {
                    style: {
                      border: "3px solid",
                      padding: "4rem",
                    },
                  }
                )
              }
            >
              Valider
            </button>
          </div>
        </form>
      </Card>
    </>
  );
}
