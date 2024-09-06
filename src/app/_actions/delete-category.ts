"use server"

import { revalidatePath } from "next/cache"
import { db } from "../_lib/prisma"

export const deleteCategory = async (categoryId: string) => {
  try {
    await db.barbershop.delete({
      where: {
        id: categoryId,
      },
    })
  } catch (error) {
    return error
  }

  revalidatePath("/admin")
}
