"use client"

import { Button } from "./ui/button"
import { CalendarIcon, DeleteIcon } from "lucide-react"
import { SheetClose, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet"
import Link from "next/link"

const SidebarAdmin = () => {
  return (
    <SheetContent className="overflow-y-auto">
      <SheetHeader>
        <SheetTitle className="text-left">Menu Adimistração</SheetTitle>
      </SheetHeader>

      <div className="g-1 flex flex-col border-b border-solid p-5">
        <SheetClose asChild>
          <Button variant="ghost" className="justify-start gap-2" asChild>
            <Link href="/admin">
              <CalendarIcon size={18} />
              Agendamentos
            </Link>
          </Button>
        </SheetClose>
      </div>

      <div className="g-1 flex flex-col border-b border-solid p-5">
        <SheetClose asChild>
          <Button variant="ghost" className="justify-start gap-2" asChild>
            <Link href="">
              <CalendarIcon size={18} />
              Adicionar Categorias
            </Link>
          </Button>
        </SheetClose>

        <SheetClose asChild>
          <Button variant="ghost" className="justify-start gap-2" asChild>
            <Link href="">
              <CalendarIcon size={18} />
              Adicionar Serviços
            </Link>
          </Button>
        </SheetClose>
      </div>

      <div className="g-1 flex flex-col border-b border-solid p-5">
        <SheetClose asChild>
          <Button variant="ghost" className="justify-start gap-2" asChild>
            <Link href="">
              <DeleteIcon size={18} />
              Remover Categorias
            </Link>
          </Button>
        </SheetClose>

        <SheetClose asChild>
          <Button variant="ghost" className="justify-start gap-2" asChild>
            <Link href="">
              <DeleteIcon size={18} />
              Remover Serviços
            </Link>
          </Button>
        </SheetClose>
      </div>
    </SheetContent>
  )
}

export default SidebarAdmin
