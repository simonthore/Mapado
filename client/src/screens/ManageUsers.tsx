import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import {
  useGetProfileQuery,
  useLogoutMutation,
  useUpdateUserRoleMutation,
  useUsersQuery,
} from "../gql/generated/schema";

const roles = ["Visitor", "City Administrator", "Super Administrator"];

export default function ManageUsers() {
  const [email, setEmail] = useState("");
  const [userRole, setUserRole] = useState("");

  const navigate = useNavigate();

  const { loading: loadingUsers, data, refetch } = useUsersQuery();
  const users = data?.users ?? [];


  const [updateUser] = useUpdateUserRoleMutation();

  const [logout] = useLogoutMutation();

  const { data: currentUser, client } = useGetProfileQuery();
  const currentUserRole = currentUser?.profile?.role;


  const onClickRoleChange = async (
    email: string,
    role: string
  ): Promise<void> => {
    setEmail(email);
    setUserRole(role);
    updateUser({ variables: { data: { email, role } } });
  };

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="max-w-screen-xl mx-auto px-5 min-h-screen">
      <button className={"backButton"} onClick={goBack}>
        {" "}
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25">
          <path d="M24 12.001H2.914l5.294-5.295-.707-.707L1 12.501l6.5 6.5.707-.707-5.293-5.293H24v-1z" />
        </svg>
      </button>
      <div className="grid divide-y divide-neutral-200 max-w-xl mx-auto mt-8">
        <h2 className={"title"}>Gérer les utilisateurs</h2>
        {users.map((user) => {
          return (
            <div className="py-5" key={user.email}>
              <details className="group">
                <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                  <div className={"manageOneUserContainer"}>
                    <span className={"userLabel"}>
                      <p>
                        {user.email} is a {userRole}
                      </p>
                    </span>
                  </div>
                  <span className="transition group-open:rotate-180">
                    <svg
                      fill="none"
                      height="24"
                      shapeRendering="geometricPrecision"
                      stroke="white"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      viewBox="0 0 24 24"
                      width="24"
                    >
                      <path d="M6 9l6 6 6-6"></path>
                    </svg>
                  </span>
                </summary>
                <h2 className={"editUser_title"}>
                  Assigner un nouveau rôle à {user.email}
                </h2>
                {roles.map((role, index) => {
                  return (
                    <div key={index} className={"editUser_container"}>
                      <option
                        className={"editUser_label"}
                        key={index}
                        value={role}
                      >
                        {role}
                      </option>
                      <button
                        className={"primaryButton"}
                        onClick={(): void => {
                          if (user.email && role)
                            onClickRoleChange(user.email, role);
                        }}
                      >
                        Select
                      </button>
                    </div>
                  );
                })}
              </details>
            </div>
          );
        })}
      </div>
    </div>
  );
}
