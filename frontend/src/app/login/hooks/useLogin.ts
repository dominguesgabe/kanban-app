"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { formLoginSchema, formLoginType } from "../types";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { ApiRoute, Route } from "@/src/internals/enums";
import { api } from "@/src/internals/adapters/api";

export const useLogin = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formLoginType>({
    resolver: zodResolver(formLoginSchema),
  });

  async function mutationFn(data: formLoginType) {
    const result = await api.post(ApiRoute.login, data);
    return result;
  }

  const { mutate } = useMutation({
    mutationFn,
    // onSuccess: () => router.replace(Route.home),
  });

  function onSubmit(data: formLoginType) {
    mutate(data);
  }

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
  };
};
