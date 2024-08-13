import { getServerSession } from "next-auth"
import Header from "../_components/header"
import { db } from "../_lib/prisma"
import { authOptions } from "../_lib/auth"
import { notFound } from "next/navigation"
import BoockingItem from "../_components/booking-item"

const Bookings = async () => {
  // buscando user logado e agendamentos feitos no prisma
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    return notFound()
  }
  const confirmedbookings = await db.booking.findMany({
    where: {
      userId: (session.user as any).id,
      date: {
        gte: new Date(),
      },
    }, // incluindo tabbela serviços
    include: {
      service: {
        include: {
          // incluindo tabela barbearia
          barbershop: true,
        },
      },
    },
    orderBy: {
      date: "asc",
    },
  })

  const concluidbookings = await db.booking.findMany({
    where: {
      userId: (session.user as any).id,
      date: {
        lt: new Date(),
      },
    }, // incluindo tabbela serviços
    include: {
      service: {
        include: {
          // incluindo tabela barbearia
          barbershop: true,
        },
      },
    },
    orderBy: {
      date: "asc",
    },
  })

  // TODO: mostrar
  return (
    <>
      <Header />
      <div className="space-y-3 p-5">
        <h1 className="text-xl font-bold">Agendamentos</h1>
        <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
          Confirmados
        </h2>

        {confirmedbookings.map((booking) => (
          <BoockingItem key={booking.id} booking={booking} />
        ))}

        <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
          Finalizados
        </h2>

        {concluidbookings.map((booking) => (
          <BoockingItem key={booking.id} booking={booking} />
        ))}
      </div>
    </>
  )
}

export default Bookings
