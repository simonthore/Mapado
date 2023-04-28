import React, {useState} from "react";
import "../assets/css/screens/ManagerUsers.css";
import {useUpdateUserRoleMutation, useUsersQuery} from "../gql/generated/schema";

const users = [
    {
        email: "titi@test.com"
    },
    {
        email: "tata@test.com"
    },
    {
        email: "toto@test.com"
    }
]
const roles = ["Visitor", "City Administrator", "Super Administrator"];
export default function ManageUsers() {
    const [email, setEmail] = useState("");
    const [userRole, setUserRole] = useState("");

    const { loading: loadingUsers, data, refetch } = useUsersQuery();
    //const users = data?.users ?? [];

    const [updateUser] = useUpdateUserRoleMutation();

    const handleRoleChange = (email: string, role: string): void => {
        setEmail(email)
        setUserRole(role);
        console.log(`User has role of ${role}`)
        updateUser({ variables: { data: { email, role } }})
    };


    return (/*        <div>
                    {users.map((user => {
                        return (
                            <div key={user.email}>
                                <p>{user.email} has role of {user.role}</p>
                                <button onClick={() => console.log("edit")}>Edit</button>
                            </div>
                        )
                    }))}
                </div>*/
        <div className={"manageCitiesContainer"}>
            <h2 className={"title"}>Gérer les utilisateurs</h2>
            <div className="max-w-screen-xl mx-auto px-5 min-h-screen">
                <div className="grid divide-y divide-neutral-200 max-w-xl mx-auto mt-8">
                    {users.map((user) => {

                        return (<div className="py-5" key={user.email}>
                                <details className="group">
                                    <summary
                                        className="flex justify-between items-center font-medium cursor-pointer list-none">
                                        <div className={"manageOneCityContainer"}>
                                            <p className={"cityLabel"}>{user.email}</p>
                                            {/*        {canDelete && (
                                                <button
                                                    className={"primaryButton"}
                                                    onClick={(e) => onClickDeleteCity(city.id)}
                                                >
                                                    Supprimer
                                                </button>
                                            )}*/}
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
                                    {roles.map((role) => {
                                        return (
                                            <div className={"userRoleContainer"} key={role}>
                                            <p className={"userRoleOptions"}>{role}</p>
                                            <button className={"primaryButton"} onClick={(): void => {
                                                handleRoleChange(user.email, role)
                                            }}
                                            >Submit
                                            </button>
                                        </div>)
                                    })}
                                </details>
                            </div>);
                    })}
                </div>
            </div>
        </div>)
}