import { useState, useContext, createContext } from "react";
const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [userEmail, setUserEmail] = useState(null);

  const setDetails = (token, email) => {
    setAccessToken(token);
    setUserEmail(email);
  };
  const clearDetails = () => {
    setAccessToken(null);
    setUserEmail(null);
  };
  return (
    <AuthContext.Provider
      value={{
        accessToken,
        userEmail,
        setDetails,
        clearDetails,
        setAccessToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext);
