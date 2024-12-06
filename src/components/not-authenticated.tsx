"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function NotAuthenticatedComponent() {
  return (
    <div className="min-h-screen flex items-center justify-center w-[75rem]">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="text-center">
          <motion.div
            animate={{
              scale: [1, 1.05, 1],
              opacity: [0.8, 1, 0.8],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-32 h-32 mx-auto mb-4"
          >
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-QtW9RxbfR6PV3u9nz198RBrGe0wDeN.png"
              alt="EcoDairy.AI Logo"
              className="w-full h-full"
            />
          </motion.div>
          <CardTitle className="text-2xl font-bold text-green-800">Whoa there, partner!</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground mb-4">
            Looks like you&apos;re trying to access the greener pastures without proper credentials. 
            Time to round up your login details or sign up for a new account!
          </p>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <Button asChild className="w-full bg-green-600 hover:bg-green-700">
            <Link href="/dashboard/login">Login to Your Farm</Link>
          </Button>
          <Button asChild variant="outline" className="w-full">
            <Link href="/dashboard/register/farmer">Create New Account</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}