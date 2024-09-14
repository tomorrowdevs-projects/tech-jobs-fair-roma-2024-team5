import express from 'express';
import cors from 'cors';
import * as trpcExpress from '@trpc/server/adapters/express';
import { router } from './trpc';
import { habitRouter } from './routers/habit';
import { userRouter } from './routers/user';

const appRouter = router({
  habit: habitRouter,
  user: userRouter
});

const app = express();
app.use(cors());

app.use(
  '/trpc',
  trpcExpress.createExpressMiddleware({
    router: appRouter,
  })
);

app.listen(3001, () => {
  console.log('Server running on http://localhost:3001');
});

export type AppRouter = typeof appRouter;