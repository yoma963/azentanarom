'use client'

import { Autocomplete, AutocompleteItem, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Textarea } from "@nextui-org/react"
import { Button, buttonVariants } from './ui/button'
import { Mail, Phone } from "lucide-react"
import { FormEvent, useRef, useState } from "react";
import { createBrowserClient } from '@supabase/ssr'
import AvatarInput from "./AvatarInput";
import { KindeUserBase } from "@kinde-oss/kinde-auth-nextjs/types";
import { trpc } from "@/app/_trpc/client";
import React from "react";


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

interface AdProps {
  isOpen: boolean,
  onOpenChange: () => void,
  user: KindeUserBase | null
}

const AdModal: React.FC<AdProps> = (props) => {

  const [avatar_url, setAvatarUrl] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const [emailValue, setEmailValue] = useState<string>("")

  const validateEmail = (value: string) => value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i)

  const isInvalid = React.useMemo(() => {
    if (emailValue === "") return false;

    return validateEmail(emailValue) ? false : true;
  }, [emailValue]);

  const inputRef = useRef<HTMLInputElement>(null);

  const { mutate: createAd, isPending: isCreating } = trpc.ad.create.useMutation({
    onSuccess: () => {
      props.onOpenChange();
    },
    onError: (error) => {
      console.error(error);
    }
  });

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData(event.currentTarget);
      
      const adData = {
        email: formData.get('email') as string,
        tel: formData.get('tel') as string,
        subjects: formData.get('subjects') as string,
        intro: formData.get('intro') as string,
        time: formData.get('time') as string,
        price: formData.get('price') as string,
        avatar_url: avatar_url
      };

      createAd(adData);
      
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }


  return (
    <>
      <Modal
        backdrop="blur"
        isOpen={props.isOpen}
        onOpenChange={props.onOpenChange}
        placement='top-center'
        size='lg'
        scrollBehavior="inside">
        <form onSubmit={onSubmit}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className='flex flex-col gap-1'>
                  Hirdetés létrehozása
                </ModalHeader>
                <ModalBody className='gap-5'>
                  <div className='text-center'>
                    <AvatarInput />
                  </div>

                  <Input
                    name="email"
                    value={emailValue}
                    type="email"
                    autoFocus
                    endContent={<Mail className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />}
                    label="Email"
                    placeholder="Email cím ahol elérhetnek a tanulók"
                    color={isInvalid ? "danger" : "default"}
                    isInvalid={isInvalid}
                    errorMessage="Kérlek egy létező email címet adj meg!"
                    onValueChange={setEmailValue}
                    variant="bordered" />
                  <Input
                    name="tel"
                    type="tel"
                    endContent={<Phone className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />}
                    label="Telefonszám"
                    placeholder="Telefonszám amin kereshetnek a tanulók"
                    variant="bordered" />
                  <Autocomplete
                    isRequired
                    name="subjects"
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
                    name="intro"
                    label="Bemutatkozás"
                    placeholder="Írj le magadról egy pár mondatos bemutatkozást"
                  />
                  <div className='flex flex-row gap-5'>
                    <Input
                      name="time"
                      inputMode="decimal"
                      endContent="perc"
                      label="Tanóra hossza"
                      placeholder="pl. 45"
                      variant="bordered" />
                    <Input
                      name="price"
                      type="tel"
                      endContent="Ft"
                      label="Tanóra ára"
                      placeholder="pl. 5000"
                      variant="bordered" />
                  </div>

                </ModalBody>
                <ModalFooter>
                  <Button onClick={onClose}>
                    Elvetés
                  </Button>
                  <Button
                    type="submit">
                    Mentés
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </form>

      </Modal>
    </>

  )
}

export default AdModal