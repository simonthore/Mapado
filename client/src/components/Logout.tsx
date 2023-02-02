import { useLogoutMutation } from "../gql/generated/schema";

export default function Logout() {

    const [logout] = useLogoutMutation();
  return (
    <a href="/login">
      <button onClick={() => logout()}>Log out</button>
    </a>
  );
}
