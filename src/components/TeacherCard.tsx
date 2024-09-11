import { Card, CardHeader, CardBody } from "@nextui-org/react";
import Image from "next/image";
import { GraduationCap } from 'lucide-react';
import { Clock } from 'lucide-react';
import Link from "next/link";
import { buttonVariants } from '@/components/ui/button'

interface Teacher {
  name: string
  picture: string
  location: string
  subjects: string[]
  isOnline: boolean
  isOffline: boolean
  price: string[]
  intro: string
}

interface teachercardprops {
  value: Teacher
  num: number
}

interface subjectsKeys { value: string }

const TeacherCard: React.FC<teachercardprops> = ({ value, num }) => {
  return (
    <div className="w-full h-full sm:my-5 p-5 sm:rounded-lg sm:hover:border-zinc-600 border-zinc-200 border-y-1 sm:border-2 bg-white flex flex-col gap-2">
      <div className="flex flex-row gap-2">
        <div className="w-28 sm:w-40 min-w-28">
          <Image
            src={value.picture}
            alt='teacher profile picture'
            width={2000}
            height={2000}
            quality={100}
            className='aspect-square object-cover'
          />
        </div>
        <div>
          <h2 className="text-3xl font-bold">{value.name}</h2>
          <div>
            <h3 className="text-xl font-bold">{value.price[0]} Ft</h3>
          </div>
          <div className="flex flex-row text-zinc-600 items-center">
            <Clock className="size-5 mr-3" />
            <p className="text-md">{value.price[1]} perces tanóra</p>
          </div>
          <div className="flex flex-row text-md text-zinc-600 items-center">
            <GraduationCap className="size-5 mr-3" />
            {value.subjects.map((subject, key) => {
              if (key < (value.subjects.length - 1)) return <p>{subject},&nbsp;</p>;
              else return <p key={key}>{subject}</p>;
            })}
          </div>
        </div>
      </div>
      <div className="text-sm flex items-center">
        <p className="line-clamp-3">{value.intro}</p>
      </div>
      <div className="">
        <Link
          className={buttonVariants({
            size: 'sm',
            className: 'w-full'
          })}
          href='/dashboard'
          target='_blank'>
          Keresés
        </Link>
      </div>
    </div>
  )
}

export default TeacherCard;