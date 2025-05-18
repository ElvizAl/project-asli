import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import ProductCard from "@/components/product-card"

const featuredProducts = [
  { name: "Apel Fuji", price: "Rp 35.000/kg", image: "/mangga.jpeg" },
  { name: "Mangga Harum Manis", price: "Rp 45.000/kg", image: "/placeholder.svg?height=300&width=300" },
  { name: "Jeruk Mandarin", price: "Rp 30.000/kg", image: "/placeholder.svg?height=300&width=300" },
  { name: "Anggur Merah", price: "Rp 75.000/kg", image: "/placeholder.svg?height=300&width=300" },
]

export default function ProductSection() {
  return (
    <section id="produk" className="bg-muted py-12 md:py-24">
      <div className="max-w-7xl mx-auto px-5">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Buah Pilihan Kami</h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Berbagai pilihan buah segar berkualitas tinggi yang siap diantar ke rumah Anda
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
          {featuredProducts.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>

        <div className="flex justify-center mt-10">
          <Button size="lg">
            Lihat Semua Produk
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  )
}