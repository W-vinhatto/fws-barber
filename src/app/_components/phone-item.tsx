"use client"

import { SmartphoneIcon } from "lucide-react"
import { Button } from "./ui/button"
import { toast } from "sonner"

interface PhoneItemProps {
  phone: string
}

const PhoneItem = ({ phone }: PhoneItemProps) => {
  const handleCopyPhoneClick = (phone: string) => {
    navigator.clipboard.writeText(phone)
    toast.success("telefone copiado com sucesso")
  }

  return (
    <div className="flex justify-between" key={phone}>
      {/* lefht */}
      <div className="flex items-center gap-2">
        <SmartphoneIcon />
        <p className="text-sm">{phone}</p>
      </div>

      {/* rigth */}
      <div>
        <Button size="sm" onClick={() => handleCopyPhoneClick(phone)}>
          Copiar
        </Button>
      </div>
    </div>
  )
}

export default PhoneItem
