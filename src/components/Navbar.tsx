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
import { useEffect } from 'react';
import ForTeachersNav from './ForTeachersNav'


const Navbar = async () => {

  const { getUser } = getKindeServerSession()
  const user = await getUser()

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

          <div className='hidden items-center space-x-4 sm:flex'>
            <Link
              href='/tanaraink'
              className={buttonVariants({
                variant: 'ghost',
                size: 'sm',
              })}>
              Tanáraink
            </Link>
            <ForTeachersNav isAuth={!!user} />
            {user ? (
              <UserAccountNav
              name={
                !user.given_name || !user.family_name
                  ? 'Your Account'
                  : `${user.given_name} ${user.family_name}`
              }
              email={user.email ?? ''}
              imageUrl={user.picture ?? ''}
            />
            ) : (null)}
            
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  )
}

export default Navbar