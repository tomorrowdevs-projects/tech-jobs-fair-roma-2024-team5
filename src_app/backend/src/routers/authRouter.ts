import { protectedProcedure, publicProcedure, router, t } from '../trpc';  // Assicurati che sia il contesto TRPC corretto
import { z } from 'zod';
import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';
import { signJwt } from '../utils/jwt';
import { TRPCError } from '@trpc/server';

const prisma = new PrismaClient();

export const authRouter = t.router({
  login: t.procedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { email, password } = input;

      // Trova l'utente nel database
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        throw new TRPCError({ code: 'BAD_REQUEST', message: 'Invalid credentials' });
      }

      // Verifica la password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new TRPCError({ code: 'BAD_REQUEST', message: 'Invalid credentials' });
      }

      // Genera un JWT e imposta il cookie
      const token = signJwt(user.id);
      
      // Si assicura che `ctx.res.cookie` sia disponibile
      if (!ctx.res) {
        throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Response object not found' });
      }
      
      ctx.res.cookie('token', token, {
        httpOnly: true,
        path: '/',
        secure: process.env.NODE_ENV === 'production', // Imposta il flag secure solo in produzione
        sameSite: 'strict', // Impedisce l'invio del cookie in richieste cross-site
        maxAge: 1000 * 60 * 60 * 24 * 30, // Imposta una scadenza di 7 giorni
      });

      return { success: true };
    }),

  logout: t.procedure.mutation(async ({ ctx }) => {
    if (!ctx.res) {
      throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Response object not found' });
    }

    // Cancella il cookie JWT
    ctx.res.clearCookie('token');
    
    return { success: true };
  }),

  getAuthInfo: protectedProcedure.query(({ ctx }) => {
    return {
      userId: ctx.userid
    }
  })
});


export const appRouter = router({
  auth: authRouter, // Collegamento del router di autenticazione
});

export type AppRouter = typeof appRouter;
