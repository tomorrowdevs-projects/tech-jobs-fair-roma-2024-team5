import express from 'express';
import cors from 'cors';
import * as trpcExpress from '@trpc/server/adapters/express';
import { router } from './trpc';
import { habitRouter } from './routers/habit';
import { userRouter } from './routers/user';
import cookieParser from 'cookie-parser';
import { createContext } from './context';
import { authRouter } from './routers/authRouter';
import cron from 'node-cron';
import { sendNotification } from './services/notification';

const appRouter = router({
  habit: habitRouter,
  user: userRouter,
  auth: authRouter,
});

const app = express();
app.use(cors({
  origin: 'http://localhost:3000', // Aggiungi il tuo frontend URL qui
  credentials: true, // Assicurati che i cookie possano essere inviati
}));

app.use(cookieParser());
app.use(
  '/trpc',
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

app.listen(3001, () => {
  console.log('Server running on http://localhost:3001');
});

sendNotification()

cron.schedule('0 8 * * *', () => {
  sendNotification()
});

export type AppRouter = typeof appRouter;
export { appRouter }; // Esporti `appRouter` per usarlo in altri file
