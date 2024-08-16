"use client"

import { Button } from "./ui/button"

import { Barbershop, BarbershopService, Booking } from "@prisma/client"
import Image from "next/image"
import { Card, CardContent } from "./ui/card"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "./ui/sheet"
import { Calendar } from "./ui/calendar"

import { ptBR } from "date-fns/locale"
import { useEffect, useMemo, useState } from "react"
import { format, isPast, isToday, set } from "date-fns"
import { createBooking } from "../_actions/create-bookins"
import { toast } from "sonner"
import { useSession } from "next-auth/react"
import { getbookings } from "../_actions/get-bookins"
import { Dialog, DialogContent } from "./ui/dialog"
import SingInDialog from "./sing-in-dialog"

interface ServiceItemProps {
  service: BarbershopService
  barbershop: Pick<Barbershop, "name">
}

const TIME_LIST = [
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
]

const ServiceItem = ({ service, barbershop }: ServiceItemProps) => {
  const [singInDialogIsOpen, setSingInDialogIsOpen] = useState(false)
  const { data } = useSession()
  const [selectDay, setSelectDay] = useState<Date | undefined>(undefined)
  const [selectTime, setSelectTime] = useState<string | undefined>(undefined)
  const [dayBookings, setDayBookings] = useState<Booking[]>([])
  const [bookingSheetIsOpen, setBookingSheetIsOpen] = useState(false)

  /* -i usando mudança de atualização da agenda */
  interface GetTimeListProps {
    bookings: Booking[]
    selectDay: Date
  }
  const getTimeList = ({ bookings, selectDay }: GetTimeListProps) => {
    return TIME_LIST.filter((time) => {
      const hour = Number(time.split(":")[0])
      const minute = Number(time.split(":")[1])

      // verifica horário do dia para não agendar antes
      const timeIsOnThePast = isPast(
        set(new Date(), { hours: hour - 2, minutes: minute }),
      )
      if (timeIsOnThePast && isToday(selectDay)) {
        return false
      }

      // verifica disponibilidade de horário
      const hasBookingOnCurrentTime = bookings.some(
        (bookings) =>
          bookings.date.getHours() === hour &&
          bookings.date.getMinutes() === minute,
      )

      if (hasBookingOnCurrentTime) {
        return false
      }
      return true
    })
  }

  useEffect(() => {
    if (!selectDay) return

    const fetch = async () => {
      const bookings = await getbookings({
        date: selectDay,
        serviceId: service.id,
      })
      setDayBookings(bookings)
    }
    fetch()
  }, [selectDay, service.id])

  /* -f */

  /* function para definir se user está logado */
  const handleBookingClick = () => {
    if (data?.user) {
      return setBookingSheetIsOpen(true)
    }
    return setSingInDialogIsOpen(true)
  }

  /* botão definindo zerar calender quando fechar */
  const handeleBookingOpenChange = () => {
    setSelectDay(undefined)
    setSelectTime(undefined)
    setDayBookings([])
    setBookingSheetIsOpen(false)
  }

  const handleDateSelect = (date: Date | undefined) => {
    setSelectDay(date)
  }

  const handleTime = (time: string) => {
    setSelectTime(time)
  }

  {
    /* chama função para create dados de agendamento */
  }

  const handleCreatedeBooking = async () => {
    try {
      if (!selectDay || !selectTime) return

      const hour = Number(selectTime.split(":")[0])
      const minute = Number(selectTime.split(":")[1])
      {
        /* acrecentando a hr na data selecionada */
      }
      const newDate = set(selectDay, {
        minutes: minute,
        hours: hour,
      })

      await createBooking({
        serviceId: service.id,
        date: newDate,
      })
      toast.success("Serviço agendado")
    } catch (error) {
      console.error(error)
      toast.error("Erro ao criar reserva")
    }
  }

  // resumindo função timelist para facilitar leitura
  // usando MEMO para evitar releitura - fazer leitura da função apenas quando
  // dayB e selec forem auterados -seme- useef
  const timeList = useMemo(() => {
    if (!selectDay) return []
    return getTimeList({
      bookings: dayBookings,
      selectDay,
    })
  }, [dayBookings, selectDay])

  return (
    <>
      <Card>
        <CardContent className="flex items-center gap-2 rounded-xl p-3">
          {/* imagem */}
          <div className="relative max-h-[110px] min-h-[110px] min-w-[110px] max-w-[110px]">
            <Image
              alt={service.name}
              src={service.imageUrl}
              fill
              className="rounded-xl object-cover"
            />
          </div>

          {/* rigth */}
          <div className="flex flex-col">
            <div className="flex flex-col gap-3">
              <h3 className="text-sm font-semibold">{service.name}</h3>
              <p className="text-sm text-gray-400">{service.description}</p>
            </div>

            {/* preço e botão */}
            <div className="flex items-center justify-between">
              <p className="text-sm font-bold text-primary">
                {Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(Number(service.price))}
              </p>

              <Sheet
                open={bookingSheetIsOpen}
                onOpenChange={handeleBookingOpenChange}
              >
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={handleBookingClick}
                >
                  Reservar
                </Button>

                <SheetContent className="overflow-y-auto p-5 px-0 [&::-webkit-scrollbar]:hidden">
                  <SheetHeader>
                    <SheetTitle>Fazer Reserva</SheetTitle>
                  </SheetHeader>

                  {/* calendario */}
                  <div className="mb-2 border-b border-solid py-5">
                    <Calendar
                      mode="single"
                      locale={ptBR}
                      selected={selectDay}
                      onSelect={handleDateSelect}
                      fromDate={new Date()}
                      styles={{
                        head_cell: {
                          width: "100%",
                          textTransform: "capitalize",
                        },
                        cell: {
                          width: "100%",
                        },
                        button: {
                          width: "100%",
                        },
                        nav_button_previous: {
                          width: "32px",
                          height: "32px",
                        },
                        nav_button_next: {
                          width: "32px",
                          height: "32px",
                        },
                        caption: {
                          textTransform: "capitalize",
                        },
                      }}
                    />
                  </div>

                  {/* logica para seleção de dia e hr */}
                  {selectDay && (
                    <div className="flex gap-3 overflow-x-auto border-b border-solid p-5 [&::-webkit-scrollbar]:hidden">
                      {timeList.length > 0 ? (
                        timeList.map((time) => (
                          <Button
                            key={time}
                            variant={selectTime == time ? "default" : "outline"}
                            className="rounded-full"
                            onClick={() => handleTime(time)}
                          >
                            {time}
                          </Button>
                        ))
                      ) : (
                        <p className="text-xs">
                          Não há horário disponivél para esse dia
                        </p>
                      )}
                    </div>
                  )}

                  {/* card para confirma agendamento */}
                  {selectTime && selectDay && (
                    <div className="p-5">
                      <Card>
                        <CardContent className="space-y-3 p-3">
                          <div className="flex items-center justify-between">
                            <h2 className="font-bold">{service.name}</h2>
                            <p className="text-sm font-bold">
                              {Intl.NumberFormat("pt-BR", {
                                style: "currency",
                                currency: "BRL",
                              }).format(Number(service.price))}
                            </p>
                          </div>

                          {/* formatando data com date fns */}
                          <div className="flex items-center justify-between">
                            <h2 className="text-sm text-gray-400">Data</h2>
                            <p className="text-sm">
                              {format(selectDay, "d 'de' MMM", {
                                locale: ptBR,
                              })}
                            </p>
                          </div>

                          {/* formatando horário */}
                          <div className="flex items-center justify-between">
                            <h2 className="text-sm text-gray-400">Horário</h2>
                            <p className="text-sm">{selectTime}</p>
                          </div>

                          {/* formatando local */}
                          <div className="flex items-center justify-between">
                            <h2 className="text-sm text-gray-400">Barbearia</h2>
                            <p className="text-sm">{barbershop.name}</p>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  )}

                  {/* div button confir */}
                  <SheetFooter className="mt-5 px-5">
                    <SheetClose asChild>
                      <Button
                        onClick={handleCreatedeBooking}
                        disabled={!selectDay || !selectTime}
                      >
                        Confirmar
                      </Button>
                    </SheetClose>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog
        open={singInDialogIsOpen}
        onOpenChange={(open) => setSingInDialogIsOpen(open)}
      >
        <DialogContent className="w-[90%]">
          <SingInDialog />
        </DialogContent>
      </Dialog>
    </>
  )
}

export default ServiceItem
