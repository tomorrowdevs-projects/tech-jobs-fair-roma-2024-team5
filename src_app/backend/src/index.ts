import express from 'express';
import cors from 'cors';
import * as trpcExpress from '@trpc/server/adapters/express';
import { router } from './trpc';
import { habitRouter } from './routers/habit';

const appRouter = router({
  habit: habitRouter,
});

const app = express();
app.use(cors());

app.use(
  '/trpc',
  trpcExpress.createExpressMiddleware({
    router: appRouter,
  })
);

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});

export type AppRouter = typeof appRouter;