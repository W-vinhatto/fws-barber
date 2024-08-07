import { Card, CardContent } from "./ui/card"

const Footer = () => {
  return (
    <footer>
      <Card className="flex items-center justify-center">
        <CardContent className="px-5 py-6">
          <p className="text-sm text-gray-400">
            @ 2024 Copyringht <span className="font-bold">BelugaDevs</span>
          </p>
        </CardContent>
      </Card>
    </footer>
  )
}

export default Footer
