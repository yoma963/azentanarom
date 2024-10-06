import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { privateProcedure, publicProcedure, router } from './trpc';
import { TRPCError } from '@trpc/server';
import { db } from '@/db';
import { z } from 'zod'

export const appRouter = router({
  authCallback: publicProcedure.query(async () => {
    const { getUser } = getKindeServerSession()
    const user = await getUser()

    if (!user.id || !user.email) throw new TRPCError({ code: 'UNAUTHORIZED' })

    const dbUser = await db.user.findFirst({
      where: {
        id: user.id,
      },
    })

    if (!dbUser) {
      await db.user.create({
        data: {
          id: user.id,
          email: user.email,
        },
      })
    }

    return { success: true }
  }),
  getUserAd: privateProcedure.query(async ({ ctx }) => {
    const { userId } = ctx

    return await db.ad.findFirst({
      where: {
        userId,
      },
    })
  }),
  getImg: privateProcedure
    .input(z.object({ key: z.string() }))
    .mutation(async({ctx, input}) => {
      const {userId} = ctx
      const image = await db.image.findFirst({
        where: {
          key: input.key,
          userId,
        },
      })
      if(!image) throw new TRPCError({code: "NOT_FOUND"})
      return image
    }),
  deleteAd: privateProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { userId } = ctx

      const file = await db.ad.findFirst({
        where: {
          id: input.id,
          userId,
        },
      })

      if (!file) throw new TRPCError({ code: 'NOT_FOUND' })

      await db.ad.delete({
        where: {
          id: input.id,
        },
      })

      return file
    }),
})

export type AppRouter = typeof appRouter;