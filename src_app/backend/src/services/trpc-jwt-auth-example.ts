// Installa: npm install jsonwebtoken @types/jsonwebtoken
   import jwt from 'jsonwebtoken';
   import { TRPCError } from '@trpc/server';
   import { middleware } from '../trpc';

   const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

   export const isAuthed = middleware(async ({ ctx, next }) => {
     if (!ctx.req.headers.authorization) {
       throw new TRPCError({ code: 'UNAUTHORIZED' });
     }
     const token = ctx.req.headers.authorization.split(' ')[1];
     try {
       const payload = jwt.verify(token, JWT_SECRET);
       ctx.user = payload;
     } catch (error) {
       throw new TRPCError({ code: 'UNAUTHORIZED' });
     }
     return next();
   });

   // Usa il middleware nelle tue procedure
   export const protectedProcedure = publicProcedure.use(isAuthed);

   // Esempio di procedura protetta
   const userRouter = router({
     getProfile: protectedProcedure.query(({ ctx }) => {
       return prisma.user.findUnique({ where: { id: ctx.user.id } });
     }),
   });
   