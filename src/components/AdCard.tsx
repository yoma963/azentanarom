import { FC } from 'react'
import { Button } from './ui/button'
import { Clock, GraduationCap, Loader2, Trash } from 'lucide-react'
import Image from "next/image";

interface AdCardProps {
  ad: {
    id: string
    description: string
    price: number
    createdAt: Date
    name: string
    location: string
    subjects: string[]
    image?: string
  }
  onDelete: () => void
  isDeleting: boolean
}

const AdCard: FC<AdCardProps> = ({ ad, onDelete, isDeleting }) => {
  return (
    <div className="w-full h-full sm:my-5 p-5 sm:rounded-lg sm:hover:border-zinc-600 border-zinc-200 border-y-1 sm:border-2 bg-white flex flex-col gap-2">
      <div className="flex flex-row gap-2">
        <div className="fw-28 sm:w-40 min-w-28">
          <Image
            src={ad.image ?? '/default-avatar.jpg'}
            alt='teacher profile picture'
            width={2000}
            height={2000}
            quality={100}
            className='aspect-square object-cover'
          />
        </div>
        <div>
          <h2 className="text-3xl font-bold">{ad.name}</h2>
          <div>
            <h3 className="text-xl font-bold">{ad.price} Ft</h3>
          </div>
          <div className="flex flex-row text-zinc-600 items-center">
            <Clock className="size-5 mr-3" />
            <p className="text-md">{ad.price} perces tanóra</p>
          </div>
          <div className="flex flex-row text-md text-zinc-600 items-center">
            <GraduationCap className="size-5 mr-3" />
            <p>{ad.subjects}</p>
          </div>
        </div>

      </div>

      <div className="text-sm flex items-center">
        <p className="line-clamp-3">{ad.description}</p>
      </div>
      <Button
        onClick={onDelete}
        size="sm"
        variant="destructive"
        disabled={isDeleting}>
        {isDeleting ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Trash className="h-4 w-4" />
        )}
      </Button>
    </div>
  )
}

export default AdCard 