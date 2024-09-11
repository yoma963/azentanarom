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

const Dashboard = () => {

  return (
    <main className='mx-auto max-w-7xl md:p-10'>
      <div className='mt-8 flex flex-col items-start justify-between gap-4 border-b border-gray-200 pb-5 sm:flex-row sm:items-center sm:gap-0'>


      </div>

      
        <div className='mt-16 flex flex-col items-center gap-2'>
          <Ghost className='h-8 w-8 text-zinc-800' />
          <h3 className='font-semibold text-xl'>
            Pretty empty around here
          </h3>
          <p>Let&apos;s upload your first PDF.</p>
        </div>
    </main>
  )
}

export default Dashboard