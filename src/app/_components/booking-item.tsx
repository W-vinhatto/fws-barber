import { Prisma } from "@prisma/client"
import { Avatar, AvatarImage } from "./ui/avatar"
import { Badge } from "./ui/badge"
import { Card, CardContent } from "./ui/card"
import { format, isFuture } from "date-fns"
import { ptBR } from "date-fns/locale"

interface BookingingItemProps {
  booking: Prisma.BookingGetPayload<{
    include: { service: { include: { barbershop: true } } }
  }>
}

// TODO: receber agendamento como propriedades
const BoockingItem = ({ booking }: BookingingItemProps) => {
  const isConfimed = isFuture(booking.date)

  return (
    <>
      <Card className="min-w-full">
        <CardContent className="flex justify-between p-0">
          {/* left */}
          <div className="my-5 flex flex-col gap-2 pl-5">
            <Badge
              className="w-fit"
              variant={isConfimed ? "default" : "secondary"}
            >
              {isConfimed ? "Confirmaado" : "Finalizado"}
            </Badge>

            <h3 className="font-semibold">{booking.service.name}</h3>

            <div className="flex items-center">
              <Avatar className="h-9 w-9">
                <AvatarImage src={booking.service.barbershop.imageUrl} />
              </Avatar>
              <p className="m-2 text-sm">{booking.service.barbershop.name}</p>
            </div>
          </div>

          {/* right */}
          <div className="flex flex-col items-center justify-center border-l-2 px-7">
            <p className="text-sm capitalize">
              {format(booking.date, "MMM", { locale: ptBR })}
            </p>
            <p className="text-2xl">
              {format(booking.date, "dd", { locale: ptBR })}
            </p>
            <p className="text-sm">
              {format(booking.date, "HH:mm", { locale: ptBR })}
            </p>
          </div>
        </CardContent>
      </Card>
    </>
  )
}

export default BoockingItem
