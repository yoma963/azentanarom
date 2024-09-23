'use client'

import { Autocomplete, AutocompleteItem, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Textarea } from "@nextui-org/react"
import { Button, buttonVariants } from './ui/button'
import { Mail, Phone } from "lucide-react"
import { useRef } from "react";

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
  onOpenChange: () => void
}

const adModal: React.FC<AdProps> = (props) => {

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
  return (
    <>
      <Modal
        backdrop="blur"
        isOpen={props.isOpen}
        onOpenChange={props.onOpenChange}
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
    </>

  )
}

export default adModal