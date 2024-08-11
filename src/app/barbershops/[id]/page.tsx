import PhoneItem from "@/app/_components/phone-item"
import ServiceItem from "@/app/_components/service-item"
import SidebarButton from "@/app/_components/siderbar-button"
import { Button } from "@/app/_components/ui/button"
import { Sheet, SheetTrigger } from "@/app/_components/ui/sheet"
import { db } from "@/app/_lib/prisma"
import { ChevronLeftIcon, MapPinIcon, MenuIcon, StarIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

// titagem definindo oque é recebido no params
interface BarbersophingPageProps {
  params: {
    id: string
  }
}

const BarbershopPages = async ({ params }: BarbersophingPageProps) => {
  // chamar banco
  const barbershop = await db.barbershop.findUnique({
    where: {
      id: params.id,
    },
    include: {
      services: true,
    },
  })

  if (!barbershop) {
    return notFound()
  }

  return (
    <div>
      {/* image */}
      <div className="relative h-[250px] w-full">
        <Image
          alt={barbershop.name}
          src={barbershop?.imageUrl}
          fill
          className="object-cover"
        />

        <Button
          size="icon"
          variant="secondary"
          className="absolute left-4 top-4"
          asChild
        >
          <Link href="/">
            <ChevronLeftIcon />
          </Link>
        </Button>

        <Sheet>
          <SheetTrigger asChild>
            <Button
              size="icon"
              variant="outline"
              className="absolute right-4 top-4"
            >
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <SidebarButton />
        </Sheet>
      </div>

      {/* title */}
      <div className="border-b border-solid p-5">
        <h1 className="mb-6 text-xl font-bold">{barbershop?.name}</h1>

        <div className="mb-2 flex items-center gap-1">
          <MapPinIcon className="text-primary" />
          <p className="text-sm">{barbershop?.address}</p>
        </div>

        <div className="ml-1 flex items-center gap-1">
          <StarIcon className="fill-primary text-primary" size={18} />
          <p className="ml-1 text-sm">5,0 ( 499 avaliações )</p>
        </div>
      </div>

      {/* descrição */}
      <div className="space-x-3 border-b border-solid p-5">
        <h2 className="ml-3 font-bold uppercase text-gray-400">Sobre Nós</h2>
        <p className="text-justify text-sm">{barbershop?.description}</p>
      </div>

      {/* serviços */}
      <div className="border-b border-solid p-5">
        <h2 className="mb-3 font-bold uppercase text-gray-400">Serviços</h2>
        <div className="space-y-3">
          {barbershop.services.map((services) => (
            <ServiceItem
              key={services.id}
              barbershop={barbershop}
              service={services}
            />
          ))}
        </div>
      </div>

      {/* contatos */}
      <div className="space-y-3 p-5">
        {barbershop.phones.map((phones) => (
          <PhoneItem key={phones} phone={phones} />
        ))}
      </div>
    </div>
  )
}
export default BarbershopPages
