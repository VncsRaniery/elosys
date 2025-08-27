import z from "zod";

export const SignInSchema = z.object({
  email: z.string().email({
    message: "Endereço de e-mail inválido",
  }),
  password: z.string().min(8, {
    message: "A senha deve ter pelo menos 8 caracteres",
  }),
});

export const SignUpSchema = z.object({
  name: z.string().min(10, {
    message: "O nome deve ter pelo menos 10 caracteres",
  }),
  email: z.string().email({
    message: "Endereço de e-mail inválido",
  }),
  password: z.string().min(8, {
    message: "A senha deve ter pelo menos 8 caracteres",
  }),
});

export type SignInSchemaType = z.infer<typeof SignInSchema>;
export type SignUpSchemaType = z.infer<typeof SignUpSchema>;
