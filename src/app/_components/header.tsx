import Image from "next/image"

import { Card, CardContent } from "./ui/card"
import { Button } from "./ui/button"
import { CalendarIcon, HomeIcon, LogOutIcon, MenuIcon } from "lucide-react"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet"
import { quickSearchOptions } from "../_constants/search"
import { Avatar, AvatarImage } from "./ui/avatar"
import Link from "next/link"

const Header = () => {
  return (
    <Card>
      <CardContent className="flex flex-row items-center justify-between p-5">
        <Image alt="fsw barber" src="/logo.svg" height={18} width={120} />

        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" variant="outline">
              <MenuIcon />
            </Button>
          </SheetTrigger>

          <SheetContent className="overflow-y-auto">
            <SheetHeader>
              <SheetTitle className="text-left">Menu</SheetTitle>

              <div className="flex items-center border-b border-solid py-5">
                <Avatar>
                  <AvatarImage src="https://conteudo.imguol.com.br/c/entretenimento/80/2017/04/25/a-atriz-zoe-saldana-como-neytiri-em-avatar-1493136439818_v2_3x4.jpg" />
                </Avatar>

                <div>
                  <p className="font-bold">Wellington Vinhatto</p>
                  <p className="text-xs">WEllington@devs</p>
                </div>
              </div>

              <div className="g-1 flex flex-col border-b border-solid p-5">
                <SheetClose asChild>
                  <Button
                    variant="ghost"
                    className="justify-start gap-2"
                    asChild
                  >
                    <Link href="/">
                      <HomeIcon size={18} />
                      Início
                    </Link>
                  </Button>
                </SheetClose>

                <Button variant="ghost" className="justify-start gap-2">
                  <CalendarIcon size={18} />
                  Agendamentos
                </Button>
              </div>

              <div className="g-1 flex flex-col border-b border-solid p-5">
                {quickSearchOptions.map((option) => (
                  <Button
                    key={option.title}
                    variant="ghost"
                    className="justify-start gap-2"
                  >
                    <Image
                      alt={option.title}
                      src={option.imageUrl}
                      height={18}
                      width={18}
                    />
                    {option.title}
                  </Button>
                ))}
              </div>

              <div className="g-2 flex flex-col py-5">
                <Button variant="ghost" className="justify-start gap-2">
                  <LogOutIcon size={18} />
                  Sair da Conta
                </Button>
              </div>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </CardContent>
    </Card>
  )
}

export default Header
