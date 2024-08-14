"use client"

import { Prisma } from "@prisma/client"
import { Avatar, AvatarImage } from "./ui/avatar"
import { Badge } from "./ui/badge"
import { Card, CardContent } from "./ui/card"
import { format, isFuture } from "date-fns"
import { ptBR } from "date-fns/locale"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet"
import Image from "next/image"
import PhoneItem from "./phone-item"
import { Button } from "./ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog"
import { deleteBooking } from "../_actions/delete-bookings"
import { toast } from "sonner"
import { useState } from "react"

interface BookingingItemProps {
  booking: Prisma.BookingGetPayload<{
    include: { service: { include: { barbershop: true } } }
  }>
}

// recebendo apenas agendamentos futuros ou seja confim
const BoockingItem = ({ booking }: BookingingItemProps) => {
  // definindo como deve ficar estado para fazer auteraçãoe fechar
  const [isSeetOpen, setIsSeetOpen] = useState(false)

  const isConfimed = isFuture(booking.date)

  const handleCancelBookingClick = async () => {
    try {
      await deleteBooking(booking.id)
      toast.success("Reserva cancelada co sucesso")
      setIsSeetOpen(false)
    } catch (error) {
      console.log(error)
      toast.error("Erro ao cancelar reserva")
    }
  }

  const handeleSheetOpenChange = (isOpen: boolean) => {
    setIsSeetOpen(isOpen)
  }

  return (
    <Sheet open={isSeetOpen} onOpenChange={handeleSheetOpenChange}>
      <SheetTrigger className="w-full">
        <Card className="min-w-[90%]">
          <CardContent className="flex justify-between p-0">
            {/* left */}
            <div className="flex flex-col gap-2 py-5 pl-5">
              <Badge
                className="w-fit"
                variant={isConfimed ? "default" : "secondary"}
              >
                {isConfimed ? "Confirmaado" : "Finalizado"}
              </Badge>

              <h3 className="font-semibold">{booking.service.name}</h3>

              <div className="flex items-center">
                <Avatar className="h-9 w-9">
                  <AvatarImage src={booking.service.barbershop.imageUrl} />
                </Avatar>
                <p className="m-2 text-sm">{booking.service.barbershop.name}</p>
              </div>
            </div>

            {/* right */}
            <div className="flex flex-col items-center justify-center border-l-2 px-7">
              <p className="text-sm capitalize">
                {format(booking.date, "MMM", { locale: ptBR })}
              </p>
              <p className="text-2xl">
                {format(booking.date, "dd", { locale: ptBR })}
              </p>
              <p className="text-sm">
                {format(booking.date, "HH:mm", { locale: ptBR })}
              </p>
            </div>
          </CardContent>
        </Card>
      </SheetTrigger>

      <SheetContent className="w-[90%]">
        <SheetHeader>
          <SheetTitle className="text-left">Informações da reserva</SheetTitle>
        </SheetHeader>

        <div className="relative mt-6 flex h-[180px] w-full items-end">
          <Image
            alt={`Mapa da barbearia ${booking.service.barbershop.name}`}
            src="/maps.png"
            fill
            className="rounded-xl object-cover"
          />

          <Card className="z-10 mx-5 mb-5 w-full rounded-xl">
            <CardContent className="flex items-center gap-3 px-5 py-3">
              <Avatar>
                <AvatarImage src={booking.service.barbershop.imageUrl} />
              </Avatar>

              <div>
                <h3 className="font-bold">{booking.service.barbershop.name}</h3>
                <p className="text-xs">{booking.service.barbershop.address}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6">
          <Badge
            className="w-fit"
            variant={isConfimed ? "default" : "secondary"}
          >
            {isConfimed ? "Confirmaado" : "Finalizado"}
          </Badge>

          <Card className="mb-6 mt-3">
            <CardContent className="space-y-3 p-3">
              <div className="flex items-center justify-between">
                <h2 className="font-bold">{booking.service.name}</h2>
                <p className="text-sm font-bold">
                  {Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(Number(booking.service.price))}
                </p>
              </div>

              {/* formatando data com date fns */}
              <div className="flex items-center justify-between">
                <h2 className="text-sm text-gray-400">Data</h2>
                <p className="text-sm">
                  {format(booking.date, "d 'de' MMM", {
                    locale: ptBR,
                  })}
                </p>
              </div>

              {/* formatando horário */}
              <div className="flex items-center justify-between">
                <h2 className="text-sm text-gray-400">Horário</h2>
                <p className="text-sm">
                  {format(booking.date, "HH:mm", {
                    locale: ptBR,
                  })}
                </p>
              </div>

              {/* formatando local */}
              <div className="flex items-center justify-between">
                <h2 className="text-sm text-gray-400">Barbearia</h2>
                <p className="text-sm">{booking.service.barbershop.name}</p>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-3">
            {booking.service.barbershop.phones.map((phone, index) => (
              <PhoneItem key={index} phone={phone} />
            ))}
          </div>
        </div>

        <SheetFooter className="mt-6">
          <div className="flex items-center justify-between gap-3">
            <SheetClose asChild>
              <Button variant="outline" className="w-full">
                Voltar
              </Button>
            </SheetClose>

            {isConfimed && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive">Cancelar Reserva</Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="w-[90%] rounded-xl">
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Você quer cancelar a sua reserva?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      Tem certeza que deseja cancelar? essa ação é irreversível.
                    </AlertDialogDescription>
                  </AlertDialogHeader>

                  <AlertDialogFooter>
                    <AlertDialogCancel>Voltar</AlertDialogCancel>

                    <AlertDialogCancel asChild className="bg-red-500">
                      <AlertDialogAction asChild className="bg-red-500">
                        <Button onClick={handleCancelBookingClick}>
                          Cancelar
                        </Button>
                      </AlertDialogAction>
                    </AlertDialogCancel>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

export default BoockingItem
