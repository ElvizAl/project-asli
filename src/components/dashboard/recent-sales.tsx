import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function RecentSales() {
  return (
    <div className="space-y-8">
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/placeholder.svg?height=36&width=36" alt="Avatar" />
          <AvatarFallback>BS</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Budi Santoso</p>
          <p className="text-sm text-muted-foreground">budi@example.com</p>
        </div>
        <div className="ml-auto font-medium">Rp 125.000</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/placeholder.svg?height=36&width=36" alt="Avatar" />
          <AvatarFallback>SR</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Siti Rahayu</p>
          <p className="text-sm text-muted-foreground">siti@example.com</p>
        </div>
        <div className="ml-auto font-medium">Rp 87.500</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/placeholder.svg?height=36&width=36" alt="Avatar" />
          <AvatarFallback>AH</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Ahmad Hidayat</p>
          <p className="text-sm text-muted-foreground">ahmad@example.com</p>
        </div>
        <div className="ml-auto font-medium">Rp 210.000</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/placeholder.svg?height=36&width=36" alt="Avatar" />
          <AvatarFallback>DL</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Dewi Lestari</p>
          <p className="text-sm text-muted-foreground">dewi@example.com</p>
        </div>
        <div className="ml-auto font-medium">Rp 65.000</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/placeholder.svg?height=36&width=36" alt="Avatar" />
          <AvatarFallback>EP</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Eko Prasetyo</p>
          <p className="text-sm text-muted-foreground">eko@example.com</p>
        </div>
        <div className="ml-auto font-medium">Rp 175.000</div>
      </div>
    </div>
  )
}
