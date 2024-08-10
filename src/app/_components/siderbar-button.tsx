"use client"

import { Button } from "./ui/button"
import { CalendarIcon, HomeIcon, LogInIcon, LogOutIcon } from "lucide-react"
import { SheetClose, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet"
import { quickSearchOptions } from "../_constants/search"
import Link from "next/link"
import Image from "next/image"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
  DialogHeader,
} from "./ui/dialog"
import { signIn, signOut, useSession } from "next-auth/react"
import { Avatar, AvatarImage } from "./ui/avatar"

const SidebarButton = () => {
  const { data } = useSession()

  const handleloginwithGoogleClick = () => signIn("google")
  const handleLogoutClick = () => signOut()

  return (
    <SheetContent className="overflow-y-auto">
      <SheetHeader>
        <SheetTitle className="text-left">Menu</SheetTitle>

        <div className="flex items-center justify-between border-b border-solid py-5">
          {data?.user ? (
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarImage src={data?.user?.image ?? ""} />
              </Avatar>

              <div>
                <p className="font-bold">{data?.user.name}</p>
                <p className="text-xs">{data?.user.email}</p>
              </div>
            </div>
          ) : (
            <>
              <h2 className="font-bold">Olá faça seu login</h2>

              <Dialog>
                <DialogTrigger asChild>
                  <Button size="icon">
                    <LogInIcon />
                  </Button>
                </DialogTrigger>

                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Faça login na plataforma</DialogTitle>
                    <DialogDescription>
                      Conecte-se usando sua conta Google
                    </DialogDescription>
                  </DialogHeader>
                  <Button
                    className="font-bold"
                    onClick={handleloginwithGoogleClick}
                  >
                    Google
                  </Button>
                </DialogContent>
              </Dialog>
            </>
          )}
        </div>

        <div className="g-1 flex flex-col border-b border-solid p-5">
          <SheetClose asChild>
            <Button variant="ghost" className="justify-start gap-2" asChild>
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
            <SheetClose key={option.title} asChild>
              <Button variant="ghost" className="justify-start gap-2" asChild>
                <Link href={`/barbershops?service=${option.title}`}>
                  <Image
                    alt={option.title}
                    src={option.imageUrl}
                    height={18}
                    width={18}
                  />
                  {option.title}
                </Link>
              </Button>
            </SheetClose>
          ))}
        </div>

        <div className="g-2 flex flex-col py-5">
          <Button
            variant="ghost"
            className="justify-start gap-2"
            onClick={handleLogoutClick}
          >
            <LogOutIcon size={18} />
            Sair da Conta
          </Button>
        </div>
      </SheetHeader>
    </SheetContent>
  )
}

export default SidebarButton
