import { z } from 'zod'
import { authRouter } from './auth-router'
import { publicProcedure, router } from './trpc'
//import { QueryValidator } from '../lib/validators/query-validator'
import { getPayloadClient } from '../get-payload'
//import { paymentRouter } from './payment-router'

export const appRouter = router({
 auth: authRouter
});

export type AppRouter = typeof appRouter;
