
import { initTRPC } from '@trpc/server';
import { TRPCError } from '@trpc/server';
import { verifyJwt } from './utils/jwt'; // La tua funzione di verifica del JWT
import { Context } from './context';
import superjson from 'superjson';


export const t = initTRPC.context<Context>().create();
export const router = t.router;
const isAuthed = t.middleware(async ({ ctx, next }) => {
  const { req } = ctx;

  const token = req.cookies.token;

  if (!token) {
    throw new TRPCError({ code: 'UNAUTHORIZED', message: 'Missing token' });
  }

  // Verifica il token JWT
  const decoded = verifyJwt(token);  // Restituisce string | JwtPayload | null

  if (!decoded) {
    throw new TRPCError({ code: 'UNAUTHORIZED', message: 'Invalid token' });
  }

  let userId: number | undefined;

  // Se decoded è una stringa, è già l'ID utente
  if (typeof decoded === 'number') {
    userId = decoded;
  } 
  // Se decoded è un JwtPayload, estrai l'ID utente (ad es., da `sub`)
  else if (typeof decoded === 'object' && decoded.userId) {
    userId = decoded.userId as number; // Assicurati che sub sia una stringa
  }

  if (!userId) {
    throw new TRPCError({ code: 'UNAUTHORIZED', message: 'Invalid token' });
  }

  // Aggiungi userid al contesto
  ctx.userid = userId;

  return next();  // Passa al prossimo middleware o procedura
});

export const protectedProcedure = t.procedure.use(isAuthed);
export const publicProcedure = t.procedure;

const ta = initTRPC.create({
  transformer: superjson,
  errorFormatter({ shape }) {
    return shape;
  },
});

// Funzione per creare un router
export const createRouter = () => {
  return t.router;
};