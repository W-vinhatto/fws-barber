"use server"

import { revalidatePath } from "next/cache"
import { db } from "../_lib/prisma"

export const deleteCategory = async (barbershopId: string) => {
  try {
    // Encontrar todos os serviços associados à barbearia
    const services = await db.barbershopService.findMany({
      where: {
        barbershopId: barbershopId,
      },
    })
    console.log(services)
    // Atualizar todos os serviços para 'sem categoria'
    await Promise.all(
      services.map(async (service) => {
        const idDoService = service.id
        try {
          await db.barbershopService.update({
            where: {
              id: "56d9e9c5-a68d-42a5-91ff-202146bc4adf",
            },
            data: {
              barbershopId: "sem categoria",
            },
          })
          console.log(`Service with ID ${idDoService} updated successfully.`)
        } catch (error) {
          console.error(`Error updating service with ID ${idDoService}:`, error)
        }
      }),
    )

    // Excluir a barbearia
    await db.barbershop.delete({
      where: {
        id: barbershopId,
      },
    })

    //console.log(`Barbershop with ID ${barbershopId} deleted successfully.`);

    // Revalidar o caminho para refletir as mudanças
    revalidatePath("/admin")
  } catch (error) {
    //console.error(`Error in deleteCategory function:`, error);
  }
}
