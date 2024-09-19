import express from 'express';
import cors from 'cors';
import * as trpcExpress from '@trpc/server/adapters/express';
import { router } from './trpc';
import { habitRouter } from './routers/habit';
import { userRouter } from './routers/user';
import cookieParser from 'cookie-parser';
import { createContext } from './context';
import { authRouter } from './routers/authRouter';
import {resetRouter} from './routers/resetPassword'
import cron from 'node-cron';
// import { sendNotification } from './services/notification';
import { notificationRouter } from './routers/notification';
import path from 'path';
import { cwd, send } from 'process';
import { sendNotification } from './services/notification';

const appRouter = router({
  habit: habitRouter,
  user: userRouter,
  auth: authRouter,
  resetP: resetRouter,
  notification: notificationRouter
});

const app = express();
app.use(cors({
  origin: 'http://localhost:3001', // Aggiungi il tuo frontend URL qui
  credentials: true, // Assicurati che i cookie possano essere inviati
}));

app.use(cookieParser());

app.use(express.static('public'))

app.use(
  '/trpc',
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

// Handle all other routes by serving index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(cwd(), 'public', 'index.html'));
});

app.listen(3001, () => {
  console.log('Server running on http://localhost:3001');
});

cron.schedule('* * * * *', () => {
  sendNotification()
});

export type AppRouter = typeof appRouter;
export { appRouter }; // Esporti `appRouter` per usarlo in altri file
