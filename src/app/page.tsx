import { SearchIcon } from "lucide-react"
import Header from "./_components/header"
import { Button } from "./_components/ui/button"
import { Input } from "./_components/ui/input"
import Image from "next/image"

const Home = () => {
  return (
    <div>
      <Header />
      <div className="p-5">
        <h2 className="text-xl font-bold">Olá. wellington</h2>
        <p>Terça feira , 6 Agosto</p>

        {/* input */}
        <div className="mt-6 flex items-center gap-2">
          <Input className="rounded-xl" placeholder="Faça sua busca" />
          <Button className="rounded-xl">
            <SearchIcon />
          </Button>
        </div>

        {/* baner */}
        <div className="relative mt-6 h-[150px] w-full">
          <Image
            alt="logo Fsw"
            src="/Banner.png"
            fill
            className="rounded-xl object-cover"
          />
        </div>
      </div>
    </div>
  )
}

export default Home
