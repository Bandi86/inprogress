import { AuthCredentialsValidator } from '../lib/validators/account-credentials-validator';
import { publicProcedure, router } from './trpc';
import { getPayloadClient } from '../get-payload';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';

export const authRouter = router({
  createPayloadUser: publicProcedure
    .input(AuthCredentialsValidator)
    .mutation(async ({ input }) => {
      const { email, password } = input;
      const payload = await getPayloadClient();

      // check if the user is already existing
      const { docs: users } = await payload.find({
        collection: 'users',
        where: {
          email: {
            equals: email,
          },
        },
      });
      if (users.length !== 0) throw new TRPCError({ code: 'CONFLICT' });

      // Create a new user
      await payload.create({
        collection: 'users',
        data: {
          email,
          password,
          role: 'user',
        },
      });
      return { succes: true, sentToEmmail: email };
    }),

  //Verify EMAIL
  verifyEmail: publicProcedure
    .input(z.object({ token: z.string() }))
    .query(async ({ input }) => {
      const { token } = input;
      const payload = await getPayloadClient();
      const isVerified = await payload.verifyEmail({
        collection: 'users',
        token,
      });
      if (!isVerified) throw new TRPCError({ code: 'UNAUTHORIZED' });
      return { success: true };
    }),

  //LOGIN
  signIn: publicProcedure
    .input(AuthCredentialsValidator)
    .mutation(async ({ input, ctx }) => {
      const { email, password } = input;
      const { res } = ctx;
      const payload = await getPayloadClient();
      try {
        await payload.login({
          collection: 'users',
          data: {
            email,
            password,
          },
          res,
        });
        return { success: true };
      } catch (error) {
        throw new TRPCError({ code: 'UNAUTHORIZED' });
      }
    }),
});
