import { SearchIcon } from "lucide-react"
import Header from "./_components/header"
import { Button } from "./_components/ui/button"
import { Input } from "./_components/ui/input"
import Image from "next/image"
import { Card, CardContent } from "./_components/ui/card"
import { db } from "./_lib/prisma"
import BarberShopItem from "./_components/barbershop-item"
import { quickSearchOptions } from "./_constants/search"
import BoockingItem from "./_components/booking-item"

const Home = async () => {
  const barbershops = await db.barbershop.findMany({})
  const popularbarbershops = await db.barbershop.findMany({
    orderBy: {
      name: "desc",
    },
  })

  return (
    <div>
      <Header />
      <div className="p-5">
        <h2 className="text-xl font-bold">Olá. wellington</h2>
        <p>Terça feira , 6 Agosto</p>

        {/* input */}
        <div className="mt-6 flex items-center gap-2">
          <Input className="rounded-xl" placeholder="Faça sua busca" />
          <Button className="rounded-xl">
            <SearchIcon />
          </Button>
        </div>

        {/* buscas */}

        <div className="mt-6 flex gap-3 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
          {quickSearchOptions.map((option) => (
            <Button className="flex gap-1" key={option.title}>
              <Image
                alt={option.title}
                src={option.imageUrl}
                width={20}
                height={20}
              />
              {option.title}
            </Button>
          ))}
        </div>

        {/* baner */}
        <div className="relative mt-6 h-[180px] w-full">
          <Image
            alt="logo Fsw"
            src="/Banner.png"
            fill
            className="rounded-xl object-cover"
          />
        </div>

        {/* agendamento */}

        <BoockingItem />

        {/* recomendadas */}
        <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
          Recomendados
        </h2>

        <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
          {barbershops.map((barbershop) => (
            <BarberShopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>

        {/* populares */}
        <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
          Populares
        </h2>

        <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
          {popularbarbershops.map((barbershop) => (
            <BarberShopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
      </div>

      <footer>
        <Card className="flex items-center justify-center">
          <CardContent className="px-5 py-6">
            <p className="text-sm text-gray-400">
              @ 2024 Copyringht <span className="font-bold">BelugaDevs</span>
            </p>
          </CardContent>
        </Card>
      </footer>
    </div>
  )
}

export default Home
