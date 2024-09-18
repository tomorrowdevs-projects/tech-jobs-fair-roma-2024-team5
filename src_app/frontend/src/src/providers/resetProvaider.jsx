import { createContext, useCallback, useEffect, useState } from "react"
import { trpc } from "../lib/trpc";


export const AuthContext = createContext({});

export default function AuthProvider({children}) {
  const resetpassword = useCallback(async ({email}) => {
    try {
      await trpc.auth.login.mutate({email})
    }
    catch(ex) {
      console.error(ex);
    }
  }, []);

  return <AuthContext.Provider value={{resetpassword}}>{children}</AuthContext.Provider>
}