"use client"

import { useRouter } from "next/navigation"

const NavigationAdmin = () => {
  const router = useRouter()

  return router.push(`/admin`)
}

export default NavigationAdmin
