"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  registerSchema,
  registerSchemaForm,
} from "@/app/schema/register.schema";

export default function Register() {
  const form = useForm<registerSchemaForm>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
  });

  async function onSubmit(data: registerSchemaForm) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/auth/signup`, {
      method: "POST",
      body: JSON.stringify({
        name: data.name.trim(),
        email: data.email.trim().toLowerCase(),
        password: data.password.trim(),
        rePassword: data.rePassword.trim(),
        phone: data.phone.trim(),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const payload = await res.json();
    console.log(payload);
  }

  return (
    <>
      <h1 className="my-5">Register Now</h1>

      <Form {...form}>
        <form className="w-2/3 mx-auto" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            name="name"
            control={form.control}
            render={({ field }) => (
              <FormItem className="my-5">
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <div className="">
                    <Input {...field} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="email"
            control={form.control}
            render={({ field }) => (
              <FormItem className="my-5">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="password"
            control={form.control}
            render={({ field }) => (
              <FormItem className="my-5">
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" autoComplete="off" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="rePassword"
            control={form.control}
            render={({ field }) => (
              <FormItem className="my-5">
                <FormLabel>rePassword</FormLabel>
                <FormControl>
                  <Input type="password" autoComplete="off" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="phone"
            control={form.control}
            render={({ field }) => (
              <FormItem className="my-5">
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input type="phone" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="bg-main w-full text-white my-5 cursor-pointer ml-auto block hover:opacity-80 transition hover:bg-main">
            Register
          </Button>
        </form>
      </Form>
    </>
  );
}
