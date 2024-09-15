'use client'

import Link from 'next/link'
import MaxWidthWrapper from './MaxWidthWrapper'
import { buttonVariants } from './ui/button'
import {
  LoginLink,
  RegisterLink,
} from '@kinde-oss/kinde-auth-nextjs'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { ArrowRight } from 'lucide-react'
import UserAccountNav from './UserAccountNav'
import MobileNav from './MobileNav'
import { headers } from 'next/headers';
import { pathname } from 'next-extra/pathname';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation'



const Navbar = async ({ user }: { user: object }) => {
  const pathname = usePathname()

  return (
    <nav className='sticky h-14 inset-x-0 top-0 z-30 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all'>
      <MaxWidthWrapper>
        <div className='flex h-14 items-center justify-between border-b border-zinc-200'>
          <Link
            href='/'
            className='flex z-40 font-semibold'>
            <span>azentanarom.hu</span>
          </Link>

          <MobileNav isAuth={!!user} />

          {/* {!!user ? (
            <>

            </>
          ) : (

          )} */}

          <div className='hidden items-center space-x-4 sm:flex'>
            <Link
              href='/tanaraink'
              className={buttonVariants({
                variant: 'ghost',
                size: 'sm',
              })}>
              Tanáraink
            </Link>
            {pathname === '/tanaroknak' ? (
              <>
                <LoginLink
                  className={buttonVariants({
                    variant: 'ghost',
                    size: 'sm',
                  })}>
                  Bejelentkezés
                </LoginLink>

                <RegisterLink
                  className={buttonVariants({
                    variant: 'warning',
                    size: 'sm',
                  })}>
                  Regisztráció{' '}
                  <ArrowRight className='ml-1.5 h-5 w-5' />
                </RegisterLink>
              </>

            ) : (
              <>
                <Link
                  href='/tanaroknak'
                  className={buttonVariants({
                    variant: 'warning',
                    size: 'sm'
                  })}>
                  Tanítani szeretnék{' '}
                  <ArrowRight className='ml-1.5 h-5 w-5' />
                </Link>
              </>
            )}


          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  )
}

export default Navbar