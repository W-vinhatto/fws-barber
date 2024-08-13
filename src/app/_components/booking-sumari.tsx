{
  /** 



import { format } from "date-fns";
import { Card, CardContent } from "./ui/card";

interface BookingSumariProps {

}

const BookingSumer = () => {
    return (
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

            {/* formatando data com date fns *
            <div className="flex items-center justify-between">
                <h2 className="text-sm text-gray-400">Data</h2>
                <p className="text-sm">
                    {format(selectDay, "d 'de' MMM", {
                        locale: ptBR,
                    })}
                </p>
            </div>

            {/* formatando horário *
            <div className="flex items-center justify-between">
                <h2 className="text-sm text-gray-400">Horário</h2>
                <p className="text-sm">{selectTime}</p>
            </div>

            {/* formatando local *
            <div className="flex items-center justify-between">
                <h2 className="text-sm text-gray-400">Barbearia</h2>
                <p className="text-sm">{barbershop.name}</p>
            </div>
        </CardContent>
    </Card>);
}

export default BookingSumer;

*/
}
