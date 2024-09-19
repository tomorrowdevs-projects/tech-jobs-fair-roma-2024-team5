import { createContext, useCallback, useEffect, useState } from "react"
import { trpc } from "../lib/trpc";


export const AuthContext = createContext({});

export default function AuthProvider({children}) {
  const [authInfo, setAuthInfo] = useState();

  const fetchAuthInfo = async () => {
    try {
      const info = await trpc.auth.getAuthInfo.query();
      setAuthInfo(info);
      console.log(info);
    }
    catch(ex) {
      setAuthInfo(null);
    }
  }

  const logout = useCallback(async () => {
    try {
      await trpc.auth.logout.mutate();
      setAuthInfo(null);
    } catch (ex) {
      console.error(ex);
    }
  }, [])

  const login = useCallback(async ({email, password}) => {
    try {
      await trpc.auth.login.mutate({email, password})
      await fetchAuthInfo();
    }
    catch(ex) {
      console.error(ex);
    }
  }, []);

  useEffect(() => {
    if (!!authInfo) {
      return;
    }

    fetchAuthInfo()
  }, [authInfo])

  return <AuthContext.Provider value={{authInfo, login, logout}}>{children}</AuthContext.Provider>
}