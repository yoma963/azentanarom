'use client'

import { trpc } from '@/app/_trpc/client'
import {
  Ghost,
  Trash,
} from 'lucide-react'
import Skeleton from 'react-loading-skeleton'
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
import ContentLoader from 'react-content-loader'

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
          <ContentLoader
            width={700}
            height={300}
            viewBox="0 0 700 300"
            backgroundColor="#f5f5f5"
            foregroundColor="#dbdbdb"
          >
            <rect x="4" y="8" rx="3" ry="3" width="7" height="288" />
            <rect x="6" y="289" rx="3" ry="3" width="669" height="8" />
            <rect x="670" y="9" rx="3" ry="3" width="6" height="285" />
            <rect x="55" y="42" rx="16" ry="16" width="274" height="216" />
            <rect x="412" y="113" rx="3" ry="3" width="102" height="7" />
            <rect x="402" y="91" rx="3" ry="3" width="178" height="6" />
            <rect x="405" y="139" rx="3" ry="3" width="178" height="6" />
            <rect x="416" y="162" rx="3" ry="3" width="102" height="7" />
            <rect x="405" y="189" rx="3" ry="3" width="178" height="6" />
            <rect x="5" y="8" rx="3" ry="3" width="669" height="7" />
            <rect x="406" y="223" rx="14" ry="14" width="72" height="32" />
            <rect x="505" y="224" rx="14" ry="14" width="72" height="32" />
            <rect x="376" y="41" rx="3" ry="3" width="231" height="29" />
          </ContentLoader>
        </div>
      ) : ads ? (
        <div className="sm:px-5 mt-10">
          <div className="mx-auto max-w-4xl sm:p-5">
            <AdCard
              key={ads.id}
              ad={{
                id: ads.id,
                userId: ads.userId,
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