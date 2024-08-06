import { SearchIcon } from "lucide-react"
import Header from "./_components/header"
import { Button } from "./_components/ui/button"
import { Input } from "./_components/ui/input"
import Image from "next/image"
import { Card, CardContent } from "./_components/ui/card"
import { Badge } from "./_components/ui/badge"
import { Avatar, AvatarImage } from "./_components/ui/avatar"

const Home = () => {
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

        {/* baner */}
        <div className="relative mt-6 h-[150px] w-full">
          <Image
            alt="logo Fsw"
            src="/Banner.png"
            fill
            className="rounded-xl object-cover"
          />
        </div>

        {/* agendamento */}

        <Card className="mt-6">
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
      </div>
    </div>
  )
}

export default Home
