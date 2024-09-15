'use client'

import { LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { buttonVariants } from "./ui/button"

const ForTeachersNav = ({ isAuth }: { isAuth: boolean }) => {

  const pathname = usePathname()

  return (
    <div>
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
        <Link
          href='/tanaroknak'
          className={buttonVariants({
            variant: 'warning',
            size: 'sm'
          })}>
          Tanítani szeretnék{' '}
          <ArrowRight className='ml-1.5 h-5 w-5' />
        </Link>
      )}
    </div>
  )
}

export default ForTeachersNav