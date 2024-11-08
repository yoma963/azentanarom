'use client'

import { trpc } from '@/app/_trpc/client'
import {
  Ghost,
  Trash,
} from 'lucide-react'
import Skeleton from 'react-loading-skeleton'
import Link from 'next/link'
import { format } from 'date-fns'
import { Button, buttonVariants } from './ui/button'
import { useRef, useState } from 'react'
import { getUserSubscriptionPlan } from '@/lib/stripe'
import {
  useDisclosure,
} from '@nextui-org/modal'
import React from 'react'
import AdModal from './AdModal'
import { KindeUser, KindeUserBase } from "@kinde-oss/kinde-auth-nextjs/types";
import AdCard from './AdCard'

interface PageProps {
  subscriptionPlan: Awaited<ReturnType<typeof getUserSubscriptionPlan>>
  user: KindeUserBase | null
}

const Dashboard = ({ subscriptionPlan, user }: PageProps) => {
  const [currentlyDeletingAd, setCurrentlyDeletingAd] =
    useState<string | null>(null)

  const utils = trpc.useContext()

  const { data: ads, isLoading } = trpc.getUserAd.useQuery()

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

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <main className='mx-auto max-w-7xl px-4 md:p-10'>
      <div className='mt-8 flex flex-row border-b justify-between border-gray-200 pb-5 items-center'>
        <h1 className='mb-3 font-bold text-5xl text-gray-900'>
          Hirdetésem
        </h1>
        <Button className={buttonVariants({
          variant: 'warning',
          size: 'sm'
        })}
          onClick={onOpen}
        >
          Létrehozás
        </Button>
        <AdModal isOpen={isOpen} onOpenChange={onOpenChange} user={user} />
      </div>

      {isLoading ? (
        <div className="mt-8 grid grid-cols-1 gap-4">
          <Skeleton height={200} />
        </div>
      ) : ads ? (
        <div className="sm:px-5 mt-10">
          <div className="mx-auto max-w-4xl sm:p-5">
            <AdCard
              key={ads.id}
              ad={{
                id: ads.id,
                description: ads.intro,
                price: parseInt(ads.price[0]),
                createdAt: new Date(),
                name: user?.given_name || 'Névtelen',
                location: 'Magyarország',
                subjects: ads.subjects.split(',').map(subject => subject.trim())
              }}
              onDelete={() => deleteAd({ id: ads.id })}
              isDeleting={currentlyDeletingAd === ads.id}
            />
          </div>
        </div>
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