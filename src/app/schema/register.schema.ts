import * as z from 'zod';

export const registerSchema = z.object({
  name: z.string()
    .nonempty("Name is required")
    .min(3, "Name must be at least 3 characters long")
    .max(10, "Name must be at most 10 characters long"),

  email: z.string()
    .nonempty("Email is required")
    .email("Not a valid email"),

  password: z.string()
    .nonempty("Password is required")
    .regex(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
      "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),

  rePassword: z.string()
    .nonempty("Please confirm your password"),

  phone: z.string()
    .nonempty("Phone number is required")
    .regex(/^(?:002)?01[0-25][0-9]{8}$/, "Not a valid Egyptian phone number")

}).refine((data) => data.password === data.rePassword, {
  path: ["rePassword"], // corrected path
  message: "Passwords don't match",
});

export type registerSchemaForm = z.infer<typeof registerSchema>;