"use server"

import { revalidatePath } from "next/cache"
import { db } from "../_lib/prisma"

export const deleteServices = async (serviceId: string) => {
  console.log(serviceId)

  const booking = await db.booking.findMany({
    where: {
      serviceId: serviceId,
    },
  })
  console.log(booking)
  try {
    await db.barbershopService.delete({
      where: {
        id: serviceId,
      },
    })
  } catch (error) {
    console.log(error)
  }

  revalidatePath("/admin")
}
