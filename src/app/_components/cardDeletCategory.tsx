"use client"

import { Button } from "./ui/button"
import { toast } from "sonner"
import { deleteCategory } from "../_actions/delete-category"
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

interface BarberShopItemProps {
  barbershop: Prisma.BarbershopGetPayload<{
    include: { services: true }
  }>
}

const CardDeletCategory = ({ barbershop }: BarberShopItemProps) => {
  const deletar = async () => {
    try {
      await deleteCategory(barbershop.id)
      console.log(barbershop.id)
      toast.success("Categoria deleteda com sucesso")
    } catch (error) {
      toast.error("erro ao deletar categoria,existem servicos associados a ela")
    }
  }

  return (
    <Sheet>
      <SheetTrigger>
        <Card className="space-y-2">
          <CardContent className="flex justify-between p-0">
            {/* left */}
            <div className="flex min-w-[40%] flex-col gap-2 p-5">
              <p className="text-xl text-red-500">{barbershop.name}</p>
              <div className="flex items-center">
                <Avatar className="h-9 w-9">
                  <AvatarImage src={barbershop.imageUrl} />
                </Avatar>
              </div>
            </div>

            {/* right */}
            <div className="flex items-center border-l-2">
              <p>
                Atenção não é possivel excluir Categoria caso tenha serviços
                associados
              </p>
            </div>
          </CardContent>
        </Card>
      </SheetTrigger>

      <SheetContent className="w-[90%]">
        <SheetHeader>
          <SheetTitle className="text-left">
            Informações da Categoria a ser Deletada
          </SheetTitle>
        </SheetHeader>

        <div className="relative mt-6 flex h-[180px] w-full items-end">
          <Card className="z-10 mx-5 mb-5 w-full rounded-xl">
            <CardContent className="flex items-center gap-3 px-5 py-3">
              <Avatar>
                <AvatarImage src={barbershop.imageUrl} />
              </Avatar>
              <p>{barbershop.address}</p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6">
          <Card className="mb-6 mt-3">
            <CardContent className="space-y-3 p-3">
              <div className="flex items-center justify-between">
                <h2 className="font-bold">{barbershop.name}</h2>
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
                <Button variant="destructive">Excluir Categoria</Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="w-[90%] rounded-xl">
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Você quer excluir essa Categoria?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    Tem certeza que deseja Excluir? essa ação é irreversível.
                  </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                  <AlertDialogCancel>Voltar</AlertDialogCancel>

                  <AlertDialogCancel asChild className="bg-red-500">
                    <AlertDialogAction asChild className="bg-red-500">
                      <Button onClick={() => deletar()}>
                        {" "}
                        deletar categoria
                      </Button>
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

export default CardDeletCategory
