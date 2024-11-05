import { Loader2, Trash } from 'lucide-react'
import { Button } from './ui/button'

interface AdCardProps {
  ad: {
    id: string
    description: string
    price: number
    createdAt: Date
    name: string
    location: string
    subjects: string[]
  }
  onDelete: () => void
  isDeleting: boolean
}

const AdCard = ({ ad, onDelete, isDeleting }: AdCardProps) => {
  return (
    <div className="relative rounded-lg border border-gray-200 bg-white shadow-md">
      <div className="p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold">{ad.name}</h3>
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
        <p className="mt-2 text-sm text-gray-600">{ad.location}</p>
        <div className="mt-4">
          <p className="text-sm text-gray-700">{ad.description}</p>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {ad.subjects.map((subject) => (
            <span
              key={subject}
              className="rounded-full bg-blue-100 px-3 py-1 text-xs text-blue-800">
              {subject}
            </span>
          ))}
        </div>
        <div className="mt-4">
          <p className="text-lg font-semibold">{ad.price} Ft/óra</p>
        </div>
      </div>
    </div>
  )
}

export default AdCard 