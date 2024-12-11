import { z } from "zod";

export type formLoginType = z.infer<typeof formLoginSchema>;

export const formLoginSchema = z.object({
  email: z.string({ required_error: "Please insert email" }).email(),
  password: z.string().min(4, "Password must contain at least 4 characters"),
});

export type formRegisterType = z.infer<typeof formRegisterSchema>;

export const formRegisterSchema = z.object({
  name: z.string({ required_error: "Please insert your name" }),
  email: z.string({ required_error: "Please insert email" }).email(),
  password: z.string().min(4, "Password must contain at least 4 characters"),
});

export interface LoginFormResponse {
  accessToken: string;
}
