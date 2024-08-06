import { SearchIcon } from "lucide-react"
import Header from "./_components/header"
import { Button } from "./_components/ui/button"
import { Input } from "./_components/ui/input"
import Image from "next/image"
import { Card, CardContent } from "./_components/ui/card"
import { Badge } from "./_components/ui/badge"
import { Avatar, AvatarImage } from "./_components/ui/avatar"
import { db } from "./_lib/prisma"
import BarberShopItem from "./_components/barbershop-item"

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
          <Button className="flex gap-1">
            <Image alt="Cabelo" src="/tesoura.png" width={20} height={20} />
            Cabelo
          </Button>

          <Button className="flex gap-1">
            <Image
              alt="Sobrancelha"
              src="/mingcute_eyebrow-fill.png"
              width={20}
              height={20}
            />
            Sobrancelha
          </Button>

          <Button className="flex gap-1">
            <Image alt="Barbar" src="/mustache.png" width={20} height={20} />
            Barbar
          </Button>

          <Button className="flex gap-1">
            <Image alt="Tratamento" src="/shampoo.png" width={20} height={20} />
            Tratamento
          </Button>
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
        <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
          Agendamentos
        </h2>
        <Card>
          <CardContent className="flex justify-between p-0">
            {/* left */}
            <div className="my-5 flex flex-col gap-2 pl-5">
              <Badge className="w-fit">Confirmado</Badge>
              <h3 className="font-semibold">Corte de cabelo</h3>

              <div className="flex items-center">
                <Avatar className="h-9 w-9">
                  <AvatarImage src="https://utfs.io/f/178da6b6-6f9a-424a-be9d-a2feb476eb36-16t.png" />
                </Avatar>
                <p className="m-2 text-sm">Barbearia FSW</p>
              </div>
            </div>

            {/* right */}
            <div className="flex flex-col items-center justify-center border-l-2 px-5">
              <p className="text-sm">Agosto</p>
              <p className="text-2xl">06</p>
              <p className="text-sm">13:15</p>
            </div>
          </CardContent>
        </Card>

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
