// import { createContext, useCallback, useEffect, useState } from "react"
// import { trpc } from "../lib/trpc";


// export const AuthContext = createContext({});

// export default function AuthProvider({children}) {
//   const [authInfo, setAuthInfo] = useState();

//   const fetchAuthInfo = async () => {
//     try {
//       const info = await trpc.user.create.query();
//       setAuthInfo(info);
//     }
//     catch(ex) {
//       setAuthInfo(null);
//     }
//   }

//   const register = useCallback(async ({ username, email, password }) => {
//     try {
//       await trpc.user.create.mutate({ username, email, password });
//       await fetchAuthInfo(); // Aggiorna le informazioni di autenticazione dopo la registrazione
//     } catch (ex) {
//       console.error(ex);
//     }
//   }, []);

//   useEffect(() => {
//     if (!!authInfo) {
//       return;
//     }

//     fetchAuthInfo()
//   }, [authInfo])

//   return <AuthContext.Provider value={{authInfo, register}}>{children}</AuthContext.Provider>
// }
