import { createContext, useContext } from "react";


export const GlobalContext = createContext();

const GlobalContextProvider = ({ children }) => {
  

  return (
    <GlobalContext.Provider
      value={{

      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;

export const useGlobalInfo = () => {
  const values = useContext(GlobalContext);

  return { ...values };
};
