'use client'

import { trpc } from '@/app/_trpc/client'
import {
  Ghost,
  Loader2,
  MessageSquare,
  Plus,
  Trash,
} from 'lucide-react'
import Skeleton from 'react-loading-skeleton'
import Link from 'next/link'
import { format } from 'date-fns'
import { Button } from './ui/button'
import { useState } from 'react'
import { getUserSubscriptionPlan } from '@/lib/stripe'

interface PageProps {
  subscriptionPlan: Awaited<ReturnType<typeof getUserSubscriptionPlan>>
}

const Dashboard = ({ subscriptionPlan }: PageProps) => {
  const [currentlyDeletingAd, setCurrentlyDeletingAd] =
    useState<string | null>(null)

  const utils = trpc.useContext()

  const { data: ad } =
    trpc.getUserAd.useQuery()

  const { mutate: deleteAd } =
    trpc.deleteAd.useMutation({
      onSuccess: () => {
        utils.getUserAd.invalidate()
      },
      onMutate({ id }) {
        setCurrentlyDeletingAd(id)
      },
      onSettled() {
        setCurrentlyDeletingAd(null)
      },
    })

  return (
    <main className='mx-auto max-w-7xl md:p-10'>
      <div className='mt-8 flex flex-col items-start justify-between gap-4 border-b border-gray-200 pb-5 sm:flex-row sm:items-center sm:gap-0'>
        <h1 className='mb-3 font-bold text-5xl text-gray-900'>
          Hirdetésem
        </h1>
        

      </div>

      {/* display all user files */}
      {ad ? (
        <p
          key={ad.id}
          className='col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow transition hover:shadow-lg'>
          <Link
            href={`/dashboard/${ad.id}`}
            className='flex flex-col gap-2'>
            <div className='pt-6 px-6 flex w-full items-center justify-between space-x-6'>
              <div className='h-10 w-10 flex-shrink-0 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500' />
              <div className='flex-1 truncate'>
                <div className='flex items-center space-x-3'>
                  <h3 className='truncate text-lg font-medium text-zinc-900'>
                    {ad.name}
                  </h3>
                </div>
              </div>
            </div>
          </Link>

          <div className='px-6 mt-4 grid grid-cols-3 place-items-center py-2 gap-6 text-xs text-zinc-500'>
            <div className='flex items-center gap-2'>
              <Plus className='h-4 w-4' />
              {format(
                new Date(ad.createdAt),
                'MMM yyyy'
              )}
            </div>

            <div className='flex items-center gap-2'>
              <MessageSquare className='h-4 w-4' />
              mocked
            </div>

            <Button
              onClick={() =>
                deleteAd({ id: ad.id })
              }
              size='sm'
              className='w-full'
              variant='destructive'>
              {currentlyDeletingAd === ad.id ? (
                <Loader2 className='h-4 w-4 animate-spin' />
              ) : (
                <Trash className='h-4 w-4' />
              )}
            </Button>
          </div>
        </p>
      ) : (
        <div className='mt-16 flex flex-col items-center gap-2'>
          <Ghost className='h-8 w-8 text-zinc-800' />
          <h3 className='font-semibold text-xl'>
            Úgy néz ki, még nincs hirdetésed
          </h3>
          <p>Hozd létre most.</p>
        </div>
      )}
    </main>
  )
}

export default Dashboard