import Image from "next/image"

export function PopularFruits() {
  return (
    <div className="space-y-8">
      {[
        { name: "Mangga Harum Manis", sales: 245, percentage: 18.5, image: "/placeholder.svg?height=40&width=40" },
        { name: "Apel Fuji", sales: 185, percentage: 14.2, image: "/placeholder.svg?height=40&width=40" },
        { name: "Pisang Cavendish", sales: 165, percentage: 12.8, image: "/placeholder.svg?height=40&width=40" },
        { name: "Jeruk Mandarin", sales: 132, percentage: 10.1, image: "/placeholder.svg?height=40&width=40" },
        { name: "Alpukat Mentega", sales: 102, percentage: 7.8, image: "/placeholder.svg?height=40&width=40" },
      ].map((fruit) => (
        <div key={fruit.name} className="flex items-center">
          <div className="relative h-10 w-10 overflow-hidden rounded-full">
            <Image
              src={fruit.image || "/placeholder.svg"}
              alt={fruit.name}
              width={40}
              height={40}
              className="object-cover"
            />
          </div>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{fruit.name}</p>
            <p className="text-sm text-muted-foreground">
              {fruit.sales} terjual ({fruit.percentage}%)
            </p>
          </div>
          <div className="ml-auto font-medium">
            #
            {["Mangga Harum Manis", "Apel Fuji", "Pisang Cavendish", "Jeruk Mandarin", "Alpukat Mentega"].indexOf(
              fruit.name,
            ) + 1}
          </div>
        </div>
      ))}
    </div>
  )
}
