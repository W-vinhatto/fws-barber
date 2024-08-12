"use server"

import { endOfDay, startOfDay } from "date-fns"
import { db } from "../_lib/prisma"

interface GetBookingsprops {
  serviceId: string
  date: Date
}

export const getbookings = ({ date }: GetBookingsprops) => {
  return db.booking.findMany({
    where: {
      date: {
        lte: endOfDay(date),
        gte: startOfDay(date),
      },
    },
  })
}
