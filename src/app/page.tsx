"use client"

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import React from "react";
import InputWithButton from "@/components/ui/input-with-button"
import { Input } from "@nextui-org/react"
import { SearchIcon } from '@/components/ui/search-icon'
import Typewriter from 'typewriter-effect';

export default function Home() {
  return (
    <>
      <MaxWidthWrapper className="mb-12 lg:mt-20 lg:flex items-center justify-center text-center">
        <div className="lg:flex-1 p-2 order-last">
          <div className='max-w-6xl'>
            <div className='mt-8 flow-root lg:mt-0'>
              <Image
                src='/teacher.png'
                alt='teacher'
                width={1000}
                height={1000}
                quality={100}
                className="mx-auto max-w-xs md:max-w-sm lg:max-w-lg"
              />
            </div>
          </div>
        </div>
        <div className="lg:flex-1 lg:px-6 lg:text-left">
          {/* <div className="mx-auto mb-4 max-w-fit items-center justify-center space-x-2 overflow-hidden rounded-full border border-gray-200 bg-white px-7 py-2 shadow-md backdrop-blur transition-all hover:border-gray-300 hover:bg-white/50">
            <p className="text-sm font-semibold text-gray-700">
              Itt az entanarom.hu!
            </p>
          </div> */}
          <h1 className='max-w-4xl text-5xl md:flex-1 font-bold md:text-6xl lg:text-7xl'>
            Találd meg a számodra{' '}
            <span className="text-primary">
              <Typewriter
                onInit={(typewriter) => {
                  typewriter.typeString('legjobb')
                    .pauseFor(2500)
                    .deleteAll()
                    .pauseFor(1500)
                    .typeString('legjobb')
                    .start();
                }}
              />
            </span>

            {' '}
            magántanárt.
          </h1>
          <p className='mt-5 md:flex-1 text-zinc-700 md:text-lg'>
            Quill allows you to have conversations with any
            PDF document. Simply upload your file and start
            asking questions right away.
          </p>
          <div className="flex items-center mt-10 max-w-lg mx-auto">
            <div className="flex-1">
              <Input type="search" classNames={{
                input: [
                  "bg-transparent",
                  "text-black/90 dark:text-white/90",
                  "placeholder:text-default-700/50 dark:placeholder:text-white/60",
                ],
                innerWrapper: "bg-transparent",
                inputWrapper: [
                  "shadow-xl",
                  "bg-default-100",
                  "dark:bg-default/60",
                  "backdrop-blur-xl",
                  "backdrop-saturate-200",
                  "hover:bg-default-200/70",
                  "dark:hover:bg-default/70",
                  "group-data-[focus=true]:bg-default-200/50",
                  "dark:group-data-[focus=true]:bg-default/60",
                  "!cursor-text",
                ]
              }}
                label="Tantárgy keresése"
                placeholder="(pl. Angol, Matematika, Történelem)"
                startContent={
                  <SearchIcon className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
                }
              />
            </div>
            <div className="mx-5">
              <Link
                className={buttonVariants({
                  size: 'search'
                })}
                href='/dashboard'
                target='_blank'>
                Keresés
              </Link>
            </div>
          </div>
        </div>
      </MaxWidthWrapper>

      {/* value proposition section */}
      <div>
        <div className='relative isolate'>
          <div
            aria-hidden='true'
            className='pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80 lg:-top-96'>
            <div
              style={{
                clipPath:
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
              className='relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]'
            />
          </div>

          <div
            aria-hidden='true'
            className='pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80 lg:-top-96'>
            <div
              style={{
                clipPath:
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
              className='relative left-[calc(50%-13rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-36rem)] sm:w-[72.1875rem]'
            />
          </div>
        </div>
      </div>

      {/* Process section */}
      <div className='mx-auto mb-20 mt-28 max-w-6xl sm:mt-40'>
        <div className='mb-12 px-6 lg:px-8'>
          <div className='mx-auto max-w-2xl sm:text-center'>
            <h2 className='mt-2 font-bold text-4xl text-gray-900 sm:text-5xl'>
              Hogyan működik?
            </h2>
          </div>
        </div>

        {/* steps */}
        <ol className='mt-8 mb-32 mx-8 space-y-4 pt-8 md:flex md:space-x-10 md:space-y-0'>
          <li className='md:flex-1'>
            <div className="hidden md:block md:mb-4 max-w-lg">
              <Image
                src='/web-search-concept-illustration.png'
                alt='first step'
                width={2000}
                height={2000}
                quality={100}
                className=''
              />
            </div>
            <div className='flex flex-col space-y-2 border-l-4 border-zinc-300 py-2 pl-4 md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pt-4'>
              <span className='text-sm font-medium text-blue-600'>
                1. lépés
              </span>
              <span className='text-xl font-semibold'>
                Keresd meg az elvárásadnak megfelelő tanárt.
              </span>
              <span className='mt-2 text-zinc-700'>
                Either starting out with a free plan or
                choose our{' '}
                <Link
                  href='/pricing'
                  className='text-blue-700 underline underline-offset-2'>
                  pro plan
                </Link>
                .
              </span>
            </div>
          </li>
          <li className='md:flex-1'>
            <div className="hidden md:block md:mb-4 max-w-lg">
              <Image
                src='/typing-concept-illustration.png'
                alt='first step'
                width={2000}
                height={2000}
                quality={100}
                className=''
              />
            </div>
            <div className='flex flex-col space-y-2 border-l-4 border-zinc-300 py-2 pl-4 md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pt-4'>
              <span className='text-sm font-medium text-blue-600'>
                2. lépés
              </span>
              <span className='text-xl font-semibold'>
                Upload your PDF file
              </span>
              <span className='mt-2 text-zinc-700'>
                We&apos;ll process your file and make it
                ready for you to chat with.
              </span>
            </div>
          </li>
          <li className='md:flex-1'>
            <div className="hidden md:block md:mb-4 max-w-lg">
              <Image
                src='/learning-languages-concept-illustration.png'
                alt='first step'
                width={2000}
                height={2000}
                quality={100}
                className=''
              />
            </div>
            <div className='flex flex-col space-y-2 border-l-4 border-zinc-300 py-2 pl-4 md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pt-4'>
              <span className='text-sm font-medium text-blue-600'>
                3. lépés
              </span>
              <span className='text-xl font-semibold'>
                Start asking questions
              </span>
              <span className='mt-2 text-zinc-700'>
                It&apos;s that simple. Try out Quill today -
                it really takes less than a minute.
              </span>
            </div>
          </li>
        </ol>
      </div>

      {/* card */}
      <div className='mx-auto items-center md:px-0 px-6 mb-28'>
        <div className="bg-purple-800 py-8 md:min-h-72 lg:min-h-80 rounded-2xl md:rounded-none grid gridx-col content-center">
          <h2 className="font-bold text-zinc-200 text-center text-3xl md:text-5xl lg:text-6xl">Az első benyomás nagyon fontos.</h2>
          <h2 className="text-warning my-2 md:my-3 font-extrabold text-center text-4xl md:text-6xl lg:text-7xl">Mi ebben segítünk!</h2>
          <p className="text-center text-zinc-300 text-lg md:text-xl">Nézd meg tanáraink bemutatkozó videóját és válassz!</p>
        </div>
      </div>

      {/* become a tutor */}
      <div className="mx-auto pb-20 lg:pb-0 ">
        <div className="lg:flex lg:mx-12 rounded-xl">
          <div className="lg:flex-1">
            <Image
              src='/young-woman-teacher-sitting-school-desk-front-blackboard-classroom-checking-homework-students-looking-camera-happy-pleased-smiling.jpg'
              alt='first step'
              width={2000}
              height={2000}
              quality={100}
              className='h-full object-cover'
            />
          </div>
          <div className="bg-warning items-center px-8 py-10 lg:flex-1 lg:px-8 grid content-center lg:justify-self-center">
            <h1 className="font-extrabold mb-5 text-zinc-800 text-4xl md:text-5xl lg:text-6xl">Become a tutor</h1>
            <p className="text-zinc-700 lg:text-lg">Earn money sharing your expert knowledge with students. Sign up to start tutoring online with Preply.</p>
            <ul className="grid list-disc my-5 px-7 gap-y-1">
              <li className="font-bold text-zinc-800 text-2xl">Find new students</li>
              <li className="font-bold text-zinc-800 text-2xl">Grow your business</li>
              <li className="font-bold text-zinc-800 text-2xl">Get paid securely</li>
            </ul>
            <div className="mt-2">
              <Link
                href='/tanaroknak'
                className={buttonVariants({
                  variant: 'ghost',
                  size: 'sm',
                  className: 'text-zinc-800'
                })}>
                Tanítani szeretnék{' '}
                <ArrowRight className='ml-1.5 h-5 w-5' />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
} 