"use server"

import { revalidatePath } from "next/cache"
import { db } from "../_lib/prisma"

export const deleteBooking = async (bookingId: string) => {
  console.log(bookingId)
  await db.booking.delete({
    where: {
      id: bookingId,
    },
  })
  revalidatePath("/bookings")
}
