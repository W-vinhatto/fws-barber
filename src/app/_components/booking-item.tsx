import { Avatar, AvatarImage } from "./ui/avatar"
import { Badge } from "./ui/badge"
import { Card, CardContent } from "./ui/card"

// TODO: receber agendamento como propriedades
const BoockingItem = () => {
  return (
    <>
      <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
        Agendamentos
      </h2>
      <Card>
        <CardContent className="flex justify-between p-0">
          {/* left */}
          <div className="my-5 flex flex-col gap-2 pl-5">
            <Badge className="w-fit">Confirmado</Badge>
            <h3 className="font-semibold">Corte de cabelo</h3>

            <div className="flex items-center">
              <Avatar className="h-9 w-9">
                <AvatarImage src="https://utfs.io/f/178da6b6-6f9a-424a-be9d-a2feb476eb36-16t.png" />
              </Avatar>
              <p className="m-2 text-sm">Barbearia FSW</p>
            </div>
          </div>

          {/* right */}
          <div className="flex flex-col items-center justify-center border-l-2 px-5">
            <p className="text-sm">Agosto</p>
            <p className="text-2xl">06</p>
            <p className="text-sm">13:15</p>
          </div>
        </CardContent>
      </Card>
    </>
  )
}

export default BoockingItem
