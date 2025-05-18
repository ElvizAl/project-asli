import { Button } from "@/components/ui/button"
import { ShoppingBag } from "lucide-react"
import Image from "next/image"

interface ProductCardProps {
  product: {
    name: string
    price: string
    image: string
  }
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="bg-background rounded-md overflow-hidden h-[280px] flex flex-col border shadow-sm hover:shadow-md transition-shadow">
      <div className="relative h-36 w-full">
        <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
      </div>
      <div className="p-3 flex flex-col flex-1 justify-between">
        <div>
          <h3 className="font-medium text-base line-clamp-1">{product.name}</h3>
          <p className="text-green-600 font-medium text-sm">{product.price}</p>
        </div>
        <Button className="w-full mt-2" size="sm" variant="outline">
          <ShoppingBag className="mr-2 h-4 w-4" />
          <span className="text-xs">Tambah</span>
        </Button>
      </div>
    </div>
  )
}