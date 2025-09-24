import * as z from 'zod';

export const loginSchema = z.object({
  email: z.string()
    .nonempty("Email is required")
    .email("Not a valid email"),

  password: z.string()
    .nonempty("Password is required")
    .regex(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
      "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character"
    )
})

export type loginSchemaForm = z.infer<typeof loginSchema>;