"use client";
import { api } from "@/src/internals/adapters/api";
import { ApiRoute, Route } from "@/src/internals/enums";
import { useToast } from "@/src/internals/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { formRegisterSchema, formRegisterType } from "../types";
import { useMutation } from "react-query";

export const useRegister = () => {
  const router = useRouter();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formRegisterType>({
    resolver: zodResolver(formRegisterSchema),
  });

  async function mutationFn(formData: formRegisterType) {
    const { data } = await api.post(ApiRoute.users, formData);
    return data;
  }

  const { mutate, isLoading } = useMutation({
    mutationFn,
    onError: (error: AxiosError) => {
      const axiosError = (error.response?.data as { message: string }) || error;
      toast({
        title: "Error",
        description: axiosError.message,
        variant: "destructive",
      });
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Your user has been created, please login",
      });
      router.replace(Route.login);
    },
  });

  function onSubmit(data: formRegisterType) {
    mutate(data);
  }

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
    isLoading,
  };
};
