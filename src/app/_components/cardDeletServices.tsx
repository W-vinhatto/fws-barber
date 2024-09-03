"use client"

import { Button } from "./ui/button"
import { toast } from "sonner"
import { deleteServices } from "../_actions/delete-Services"
import { Prisma } from "@prisma/client"

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
    <div className="m-2 bg-slate-500">
      <p>{serviceId.name}</p>
      <Button onClick={() => deletar()}>deletar{serviceId.name}</Button>
    </div>
  )
}

export default CardDeletService
