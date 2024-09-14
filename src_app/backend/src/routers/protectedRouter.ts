import { t } from '../trpc';  // Importa il contesto del router (initTRPC o equivalente)
import { isAuthenticated } from '../middlewares/authMiddleware';  // Il tuo middleware di autenticazione


// ho definito un sotto-router che estende appRouter
export const protectedRouter = t.router({
  getUserData: t.procedure.use(isAuthenticated).query(async ({ ctx }) => {
    const userId = ctx.userid;
    if (!userId) {
      throw new Error('User not authenticated');
    }
    
    // qui si può restituire i dati dell'utente autenticato
    return { userId };
  }),
});
export default protectedRouter;
