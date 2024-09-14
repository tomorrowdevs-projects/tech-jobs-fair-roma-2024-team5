import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';

export const trpc = createTRPCProxyClient({
  links: [
    httpBatchLink({
      url: 'http://localhost:3000/trpc', // URL del tuo server tRPC
    }),
  ],
});