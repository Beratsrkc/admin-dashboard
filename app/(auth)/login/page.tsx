"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import React from 'react'
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { pb } from "@/lib/pocketbase"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"


const formSchema = z.object({
  email: z.string().email({
    message: "Email must be at least 2 characters.",
  }),
  password: z.string().min(2, {
    message: "Password must be at least 2 characters.",
  }),
})


const LoginPage = () => {

  const { toast } = useToast()
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "beratsarikoc7@gmail.com",
      password: "Beratberat61"
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {

    try {

      const authData = await pb.collection('users').authWithPassword(
       values.email,
      values.password
    );

    toast({
      title: "Error ",
      description: "something went wrong",
      variant:"success"
      
    })

    router.push("/")
    
      
    } catch (error) {

      toast({
        title: "Error ",
        description: "something went wrong",
        variant:"destructive"
        
      })
      
    }
    console.log(values)
  }
  return (
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>email</FormLabel>
            <FormControl>
              <Input placeholder="email" {...field} />
            </FormControl>

            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="password"
        render={({ field }) => (
          <FormItem>
            <FormLabel>password</FormLabel>
            <FormControl>
              <Input type='password' placeholder="password" {...field} />
            </FormControl>

            <FormMessage />
          </FormItem>
        )}
      />
      
      <Button type="submit">Submit</Button>
    </form>
  </Form>
  )
}

export default LoginPage
