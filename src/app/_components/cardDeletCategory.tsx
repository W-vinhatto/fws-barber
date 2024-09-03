"use client"

import { Button } from "./ui/button"
import { toast } from "sonner"
import { deleteCategory } from "../_actions/delete-category"
import { Prisma } from "@prisma/client"

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
    <div className="m-2 bg-slate-500">
      <p>{barbershop.name}</p>
      <Button onClick={() => deletar()}> deletar categoria</Button>
    </div>
  )
}

export default CardDeletCategory
