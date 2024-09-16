import { TRPCError } from '@trpc/server';
// import { verifyJwt } from '../utils/jwt';
// import { inferAsyncReturnType } from '@trpc/server';
// import { createContext } from '../context'; // Assumendo che tu abbia un contesto di tRPC

import { t } from '../trpc'; // Assicurati di avere l'istanza initTRPC

export const isAuthenticated = t.middleware(async ({ ctx, next }) => {
  const userId = ctx.userid; // Qui si assume che `ctx.userid` sia stato già impostato

  if (!userId) {
    throw new TRPCError({ code: 'UNAUTHORIZED', message: 'User not authenticated' });
  }

  // Passa l'utente autenticato al contesto successivo
  return next({
    ctx: {
      ...ctx,
      userId, // Propaga l'ID utente al prossimo middleware o procedura
    },
  });
});