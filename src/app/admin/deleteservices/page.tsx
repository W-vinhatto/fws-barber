import CardDeletService from "@/app/_components/cardDeletServices"
import Header from "@/app/_components/header"
import SidebarAdmin from "@/app/_components/siderbar-admin"
import { Button } from "@/app/_components/ui/button"
import { Card, CardContent } from "@/app/_components/ui/card"
import { SheetTrigger, Sheet } from "@/app/_components/ui/sheet"
import { db } from "@/app/_lib/prisma"
import { MenuIcon } from "lucide-react"

const DeleteService = async () => {
  const services = await db.barbershopService.findMany({})

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
      <div></div>

      <div className="flex flex-col p-6">
        {services.map((service) => (
          <div key={service.id} className="mt-3">
            <CardDeletService serviceId={service} />
          </div>
        ))}
      </div>
    </>
  )
}

export default DeleteService
