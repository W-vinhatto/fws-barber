import { Button } from "./ui/button"
import { DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog"
import { signIn } from "next-auth/react"

const handleloginwithGoogleClick = () => signIn("google")

const SingInDialog = () => {
  return (
    <>
      <DialogHeader>
        <DialogTitle>Faça login na plataforma</DialogTitle>
        <DialogDescription>
          Conecte-se usando sua conta Google
        </DialogDescription>
      </DialogHeader>
      <Button className="font-bold" onClick={handleloginwithGoogleClick}>
        Google
      </Button>
    </>
  )
}

export default SingInDialog
