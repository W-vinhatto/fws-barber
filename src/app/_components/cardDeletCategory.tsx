"use client"

import { Button } from "./ui/button"
import { toast } from "sonner"
import { deleteCategory } from "../_actions/delete-category"
import { Prisma } from "@prisma/client"
import { Card, CardContent } from "./ui/card"

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
    <div className="flex flex-col p-6">
      <Card className="mb-6 mt-3" key={barbershop.id}>
        <CardContent className="space-y-2 p-3">
          <div className="flex space-x-1">
            <div>
              <p>
                Atenção não é possivel excluir categoria caso tenha serviços
                associados
              </p>
            </div>

            <div className="flex flex-col justify-between">
              <h2 className="text-center text-lg">{barbershop.name}</h2>
              <Button onClick={() => deletar()}> deletar categoria</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default CardDeletCategory
