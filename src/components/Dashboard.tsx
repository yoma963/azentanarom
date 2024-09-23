'use client'

import { trpc } from '@/app/_trpc/client'
import {
  Ghost,
  Loader2,
  MessageSquare,
  Phone,
  Plus,
  Trash,
  Mail,
  DollarSign,
  Clock
} from 'lucide-react'
import Skeleton from 'react-loading-skeleton'
import Link from 'next/link'
import { format } from 'date-fns'
import { Button, buttonVariants } from './ui/button'
import { useRef, useState } from 'react'
import { getUserSubscriptionPlan } from '@/lib/stripe'
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
  ModalFooter
} from '@nextui-org/modal'
import { Input } from '@nextui-org/input'
import React from 'react'
import {
  Autocomplete,
  AutocompleteSection,
  AutocompleteItem
} from "@nextui-org/autocomplete";
import { Textarea } from "@nextui-org/react";


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

  const [selectedKeys, setSelectedKeys] = React.useState(new Set(["Tantárgyaim: "]));

  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys]
  );

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const subjects = [
    { label: "Matematika", value: "matematika", description: "Az alapvető számítási és logikai készségeket fejleszti" },
    { label: "Fizika", value: "fizika", description: "A természet törvényeit és az anyagok mozgását tanulmányozza" },
    { label: "Kémia", value: "kemia", description: "Az anyagok összetételét, szerkezetét és tulajdonságait vizsgálja" },
    { label: "Biológia", value: "biologia", description: "Az élőlények felépítését és működését kutatja" },
    { label: "Földrajz", value: "foldrajz", description: "A Föld felszínét, éghajlatát és természeti jelenségeit vizsgálja" },
    { label: "Történelem", value: "tortenelem", description: "Az emberi történelem eseményeit és fejlődését mutatja be" },
    { label: "Magyar irodalom", value: "magyar_irodalom", description: "A magyar nyelvű irodalmi művek tanulmányozása" },
    { label: "Magyar nyelvtan", value: "magyar_nyelvtan", description: "A magyar nyelv szabályainak és szerkezetének ismerete" },
    { label: "Angol", value: "angol", description: "Az angol nyelv elsajátítása és használata" },
    { label: "Informatika", value: "informatika", description: "Számítógépes ismeretek és programozás tanulása" },
    { label: "Testnevelés", value: "testneveles", description: "A fizikai állóképesség és sportos életmód fejlesztése" },
    { label: "Művészetek", value: "muveszetek", description: "Kreatív képességek és művészeti technikák elsajátítása" },
  ];

  const inputRef = useRef<HTMLInputElement>(null);

  function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files) return;

    const file = files[0];

    // use the file
    console.log(file.name);
  }

  function handleButtonClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (!inputRef || !inputRef.current) return;

    inputRef.current.click();
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileUploaded = e.currentTarget.value; // ADDED
  };

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
        <Modal
          backdrop="blur"
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          placement='top-center'
          size='lg'
          scrollBehavior="inside">
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className='flex flex-col gap-1'>
                  Hirdetés létrehozása
                </ModalHeader>
                <ModalBody className='gap-5'>
                  <div className='text-center'>
                    <img
                      src="https://tecdn.b-cdn.net/img/new/avatars/5.webp"
                      className="mx-auto mb-4 w-32 rounded-lg"
                      alt="Avatar" />

                    <Button
                      onClick={handleButtonClick}
                      className={buttonVariants({
                        variant: 'warning',
                        size: 'sm'
                      })}
                    >
                      Profilkép feltöltése
                    </Button>
                    <input
                      type="file"
                      ref={inputRef}
                      accept='image/'
                      className=''
                      hidden
                      onChange={handleFileUpload}
                    />
                  </div>

                  <Input
                    type="email"
                    autoFocus
                    endContent={<Mail className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />}
                    label="Email"
                    placeholder="Email cím ahol elérhetnek a tanulók"
                    variant="bordered" />
                  <Input
                    type="tel"
                    endContent={<Phone className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />}
                    label="Telefonszám"
                    placeholder="Telefonszám amin kereshetnek a tanulók"
                    variant="bordered" />
                  <Autocomplete
                    isRequired
                    label="Amit tanítani szeretnél"
                    defaultItems={subjects}
                    placeholder="Tantárgy keresése"
                    defaultSelectedKey="cat"
                    variant="bordered"
                  >
                    {(item) => <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>}
                  </Autocomplete>
                  <Textarea
                    isRequired
                    label="Bemutatkozás"
                    placeholder="Írj le magadról egy pár mondatos bemutatkozást"
                  />
                  <div className='flex flex-row gap-5'>
                    <Input
                      inputMode="decimal"
                      endContent="perc"
                      label="Tanóra hossza"
                      placeholder="pl. 45"
                      variant="bordered" />
                    <Input
                      type="tel"
                      endContent="Ft"
                      label="Tanóra ára"
                      placeholder="pl. 5000"
                      variant="bordered" />
                  </div>

                </ModalBody>
                <ModalFooter>
                  <Button onClick={onClose}>
                    Close
                  </Button>
                  <Button onClick={onClose}>
                    Mentés
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
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