"use client"

import Link from "next/link";
import { Route } from "@/src/internals/enums";
import { FormFieldError, Input } from "@/src/components";
import { useLogin } from "../hooks/useLogin";

export function FormLogin() {
  const {
    register,
    handleSubmit,
    onSubmit,
    errors
  } = useLogin()

  return (
    <div className="flex flex-col gap-2 w-full sm:max-w-96">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-col gap-2"
      >
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
          Login
        </button>
      </form>
      <Link
        href={Route.register}
        className="text-cyan-500 underline"
      >
        Register
      </Link>
    </div>
  );
}
