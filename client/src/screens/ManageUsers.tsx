import React, { useEffect, useState } from "react";
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
  
  const { loading: loadingUsers, data, refetch } = useUsersQuery();
  const users = data?.users ?? [];
  
  const [updateUser] = useUpdateUserRoleMutation();
  
  const [logout] = useLogoutMutation();
  
  const { data: currentUser, client } = useGetProfileQuery();
  const currentUserRole = currentUser?.profile?.role;
  const [role, setRole] = useState(currentUserRole);
  
  const onClickRoleChange = (email: string, role: string): void => {
    setEmail(email);
    setUserRole(role);
    updateUser({ variables: { data: { email, role } } });
    console.log(`${email} now has role of ${role}`);
  };

  return (
    <div className={"manageUsersContainer"}>
      <div className="max-w-screen-xl mx-auto px-5 min-h-screen">
        <div className="grid divide-y divide-neutral-200 max-w-xl mx-auto mt-8">
          {users.map((user) => {
            console.log(user);
            return (
              <div className="py-5" key={user.email}>
                <details className="group">
                  <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                    <div className={"manageOneUserContainer"}>
                      <p className={"userLabel"}>
                        {user.email} is a {user.role}
                      </p>
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
                  <h2 className={"title"}>Assigner un rôle à un utilisateur</h2>
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
    </div>
  );
}
