"use client"

import { Button } from "./ui/button"
import { toast } from "sonner"
import { deleteServices } from "../_actions/delete-Services"
import { Prisma } from "@prisma/client"
import { Card, CardContent } from "./ui/card"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet"
import { Avatar, AvatarImage } from "./ui/avatar"
import Image from "next/image"
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

interface BarberShopServiceProps {
  serviceId: Prisma.BarbershopServiceGetPayload<{
    include: { bookings: true }
  }>
}

const CardDeletService = ({ serviceId }: BarberShopServiceProps) => {
  const deletar = async () => {
    try {
      await deleteServices(serviceId.id)
      toast.success("Serviço deletado com sucesso")
    } catch (error) {
      toast.error("Erro ao deletar Serviço")
    }
  }

  return (
    <Sheet>
      <SheetTrigger>
        <Card className="space-y-2">
          <CardContent className="flex justify-between p-0">
            {/* left */}
            <div className="flex min-w-[40%] flex-col gap-2 p-5">
              <p className="text-xl text-red-500">{serviceId.name}</p>
              <div className="flex items-center">
                <Avatar className="h-9 w-9">
                  <AvatarImage src={serviceId.imageUrl} />
                </Avatar>
              </div>
            </div>

            {/* right */}
            <div className="flex items-center border-l-2">
              <p>
                Atenção não é possivel excluir Serviço caso tenha agendamentos
                associados
              </p>
            </div>
          </CardContent>
        </Card>
      </SheetTrigger>

      <SheetContent className="w-[90%]">
        <SheetHeader>
          <SheetTitle className="text-left">
            Informações do serviço a ser Deletado
          </SheetTitle>
        </SheetHeader>

        <div className="relative mt-6 flex h-[180px] w-full items-end">
          <Image
            alt={`Mapa`}
            src="/maps.png"
            fill
            className="rounded-xl object-cover"
          />

          <Card className="z-10 mx-5 mb-5 w-full rounded-xl">
            <CardContent className="flex items-center gap-3 px-5 py-3">
              <Avatar>
                <AvatarImage src={serviceId.imageUrl} />
              </Avatar>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6">
          <Card className="mb-6 mt-3">
            <CardContent className="space-y-3 p-3">
              <div className="flex items-center justify-between">
                <h2 className="font-bold">{serviceId.name}</h2>
                <p className="text-sm font-bold">
                  {Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(Number(serviceId.price))}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <SheetFooter className="mt-6">
          <div className="flex items-center justify-between gap-3">
            <SheetClose asChild>
              <Button variant="outline" className="w-full">
                Voltar
              </Button>
            </SheetClose>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive">Excluir Serviço</Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="w-[90%] rounded-xl">
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Você quer excluir esse serviço?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    Tem certeza que deseja Excluir? essa ação é irreversível.
                  </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                  <AlertDialogCancel>Voltar</AlertDialogCancel>

                  <AlertDialogCancel asChild className="bg-red-500">
                    <AlertDialogAction asChild className="bg-red-500">
                      <Button onClick={() => deletar()}>Deletar Serviço</Button>
                    </AlertDialogAction>
                  </AlertDialogCancel>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

export default CardDeletService
