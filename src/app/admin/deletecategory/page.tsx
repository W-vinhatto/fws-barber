import CardDeletCategory from "@/app/_components/cardDeletCategory"
import Header from "@/app/_components/header"
import SidebarAdmin from "@/app/_components/siderbar-admin"
import { Button } from "@/app/_components/ui/button"
import { Card, CardContent } from "@/app/_components/ui/card"
import { SheetTrigger, Sheet } from "@/app/_components/ui/sheet"
import { db } from "@/app/_lib/prisma"
import { MenuIcon } from "lucide-react"

const DeleteCategorry = async () => {
  const categorys = await db.barbershop.findMany({})

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
        {categorys.map((categoria) => (
          <CardDeletCategory key={categoria.id} barbershop={categoria} />
        ))}
      </div>
    </>
  )
}

export default DeleteCategorry
