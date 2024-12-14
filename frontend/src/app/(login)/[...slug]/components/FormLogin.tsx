"use client"

import { FormFieldError, Input } from "@/src/components";
import { Route } from "@/src/internals/enums";
import Link from "next/link";
import { useLogin } from "../hooks/useLogin";

export function FormLogin() {
  const {
    register,
    handleSubmit,
    onSubmit,
    errors,
    isLoading
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
          {isLoading ? "Loading..." : "Login"}
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
