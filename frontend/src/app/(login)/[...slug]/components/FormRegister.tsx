"use client"

import { FormFieldError, Input } from "@/src/components";
import { Route } from "@/src/internals/enums";
import Link from "next/link";
import { useRegister } from "../hooks/useRegister";

export function FormRegister() {

  const {
    register,
    handleSubmit,
    onSubmit,
    errors,
    isPending
  } = useRegister()

  return (
    <div className="flex flex-col gap-2 w-full sm:max-w-96">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-col gap-2"
      >
        <span>
          <Input
            placeholder="Name"
            {...register("name")}
          />
          <FormFieldError
            errors={errors}
            field="name"
          />
        </span>
        <span>
          <Input
            placeholder="Email"
            {...register("email")}
          />
          <FormFieldError
            errors={errors}
            field="email"
          />
        </span>
        <span>
          <Input
            type="password"
            placeholder="Password"
            {...register("password")}
          />
          <FormFieldError
            errors={errors}
            field="password"
          />
        </span>
        <button
          type="submit"
          className="bg-cyan-500 hover:bg-cyan-400 transition text-white p-2 rounded font-semibold"
        >
          {isPending ? "Loading..." : "Register"}
        </button>
      </form>
      <Link
        href={Route.login}
        className="text-cyan-500 underline"
      >
        Already have an account? Login
      </Link>
    </div>
  );
}
