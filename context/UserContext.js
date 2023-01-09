import { createContext, useContext, useState } from "react";
import { useQuery } from "react-query";
import { KEY_USERS } from "../helpers/query-keys";


export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState("");
  async function getUsers(url = ''){
    const response = await fetch(url,{
        method:'GET',
        headers:{
          'Content-Type':'application/json',
        }
    });
    return response.json();
}

  const propsReactQuery = useQuery([KEY_USERS], () => getUsers('api/users')
)
  return (
    <UserContext.Provider
      value={{
        propsReactQuery,
        currentUser,
        setCurrentUser
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;

export const useUserInfo = () => {
  const values = useContext(UserContext);

  return { ...values };
};
