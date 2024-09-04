"use client"

import { Button } from "./ui/button"
import { toast } from "sonner"
import { deleteServices } from "../_actions/delete-Services"
import { Prisma } from "@prisma/client"
import { Card, CardContent } from "./ui/card"

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
    <Card className="mb-6 mt-3" key={serviceId.id}>
      <CardContent className="h-40 space-y-2 p-3">
        <div className="flex h-[100%] space-x-3">
          <div className="flex h-[100%] items-center justify-center">
            <p>
              Atenção não é possivel excluir Serviço caso tenha agendamentos
              associados
            </p>
          </div>

          <div className="flex flex-col justify-between">
            <h2 className="text-center text-lg">{serviceId.name}</h2>
            <Button onClick={() => deletar()}> deletar Serviço</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default CardDeletService
