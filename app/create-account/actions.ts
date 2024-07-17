"use server";
import { z } from "zod";

const passwordRegex = new RegExp(
  /^(?=.*[a-z])^(?=.*[A-Z])(?=.*\d)(?=.*?[#?!@$%^&*-]).+$/
);

const checkUsername = (username: string) => !username.includes("potato");
const checkPassword = ({
  password,
  confirmPassword,
}: {
  password: string;
  confirmPassword: string;
}) => password === confirmPassword;

const formSchema = z
  .object({
    username: z
      .string({
        invalid_type_error: "Username must be a string",
        required_error: "Where is your Username",
      })
      .min(3, "too short")
      .max(10, "too long")
      .toLowerCase()
      .refine(checkUsername, "No potatoes"),
    email: z.string().email().trim().toLowerCase(),
    password: z
      .string()
      .min(8)
      .regex(
        passwordRegex,
        "A password must have lowercase, uppercase, a number and special characters"
      ),
    confirmPassword: z.string().min(8),
  })
  .refine(checkPassword, {
    message: "password does not match with confirmPassword",
    path: ["confirmPassword"],
  });

export async function createAccount(prevState: any, formData: FormData) {
  const data = {
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  };

  const result = formSchema.safeParse(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    console.log(result.data);
  }
}
