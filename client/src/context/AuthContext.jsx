import { useState, useContext, createContext, useEffect } from "react";
import { setupInterceptors } from "../api/setupInterceptors";
import api from "../api/axios";


const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [userEmail, setUserEmail] = useState(null);

console.log("accesstoekn",accessToken)
console.log("userEmail",userEmail)

useEffect(() => {
  const restoreSession = async () => {
    try {
      const res = await api.post("/api/refresh");
      setAccessToken(res.data.accessToken);
    } catch {
      setAccessToken(null);
    }
  };

  restoreSession();
}, []);


  useEffect(() => {
    setupInterceptors(
      () => accessToken,
      (token) => setAccessToken(token),
    );
  }, []);

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
