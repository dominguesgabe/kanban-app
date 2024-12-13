"use client";
import { api } from "@/src/internals/adapters/api";
import { ApiRoute, Route } from "@/src/internals/enums";
import { useToast } from "@/src/internals/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { formLoginSchema, formLoginType, LoginFormResponse } from "../types";

export const useLogin = () => {
  const router = useRouter();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formLoginType>({
    resolver: zodResolver(formLoginSchema),
  });

  async function mutationFn(formData: formLoginType) {
    const { data } = await api.post<LoginFormResponse>(
      ApiRoute.login,
      formData
    );
    return data;
  }

  const { mutate, isPending } = useMutation({
    mutationFn,
    onError: (error: AxiosError) => {
      const axiosError = (error.response?.data as { message: string }) || error;
      toast({
        title: "Error",
        description: axiosError.message,
        variant: "destructive",
      });
    },
    onSuccess: ({ accessToken }) => {
      Cookies.set("auth-token", `Bearer ${accessToken}`, { expires: 1 });
      router.replace(Route.home);
    },
  });

  function onSubmit(data: formLoginType) {
    mutate(data);
  }

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
    isPending,
  };
};
