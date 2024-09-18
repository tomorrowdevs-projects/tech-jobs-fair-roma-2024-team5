import { inferAsyncReturnType } from '@trpc/server';
import { Request, Response } from 'express';
import { t } from './trpc';

export function createContext({ req, res }: { req: Request, res: Response }) {
  return { req, res };
}

export type Context = inferAsyncReturnType<typeof createContext> & {
  userid?: number;  // Aggiungi userid come proprietà opzionale
};

// Funzione per creare un router
export const createRouter = (p0: unknown) => {
  return t.router;
};