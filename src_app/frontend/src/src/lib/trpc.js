import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';

/**
 * @typedef {import('../../../../backend/src/index.ts').AppRouter} AppRouter
 */

/** @type {import('@trpc/client').CreateTRPCProxyClient<AppRouter>} */
export const trpc = createTRPCProxyClient({
  links: [
    httpBatchLink({
      url: 'http://localhost:3000/trpc', // URL del tuo server tRPC
    }),
  ],
});