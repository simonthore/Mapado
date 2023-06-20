import { useState, useEffect, useMemo } from "react";

export const useRoles = (usersList: any) => {
  const [user, setUser] = useState({});
  let updatedUsers: {}[] = [];

  function createUpdatedUsersList(usersList: any) {
    usersList.map((user: any) => {
      setUser({
        user,
      });
      updatedUsers.push(user);
      return updatedUsers;
    });
  }
  useMemo(() => createUpdatedUsersList(usersList), []);
  console.log(updatedUsers);
  return updatedUsers;
};
