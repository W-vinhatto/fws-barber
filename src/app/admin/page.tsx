import { MenuIcon } from "lucide-react"
//import CardDeletCategory from "../_components/cardDeletCategory"
//import CardDeletService from "../_components/cardDeletServices"
import Header from "../_components/header"
import { Button } from "../_components/ui/button"
import { Card, CardContent } from "../_components/ui/card"
import { Sheet, SheetTrigger } from "../_components/ui/sheet"
import { db } from "../_lib/prisma"
import SidebarAdmin from "../_components/siderbar-admin"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

const Admin = async () => {
  const agendados = await db.booking.findMany({
    include: {
      service: true,
    },
  })

  // Supondo que agendados seja uma lista de objetos com uma data
  const sortedAgendados = agendados.sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  )

  return (
    <>
      <Header />
      <div className="mt-3">
        <Card>
          <CardContent className="flex justify-between p-5">
            <p className="mt-2 text-center font-bold"> Bem vindo a sua loja!</p>
            <Sheet>
              <SheetTrigger asChild>
                <Button size="icon" variant="outline">
                  <MenuIcon />
                </Button>
              </SheetTrigger>
              <SidebarAdmin />
            </Sheet>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col p-6">
        {sortedAgendados.map((agenda) => (
          <Card className="mb-6 mt-3" key={agenda.id}>
            <CardContent className="space-y-3 p-3">
              <div className="flex items-center justify-between">
                <h2 className="font-bold">{agenda.service.name}</h2>
                <p className="text-sm font-bold">
                  {Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(Number(agenda.service.price))}
                </p>
              </div>

              {/* formatando data com date fns */}
              <div className="flex items-center justify-between">
                <h2 className="text-sm text-gray-400">Data</h2>
                <p className="text-sm">
                  {format(agenda.date, "d 'de' MMMM", {
                    locale: ptBR,
                  })}
                </p>
              </div>

              {/* formatando horário */}
              <div className="flex items-center justify-between">
                <h2 className="text-sm text-gray-400">Horário</h2>
                <p className="text-sm">
                  {format(agenda.date, "HH:mm", {
                    locale: ptBR,
                  })}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  )
}

export default Admin
