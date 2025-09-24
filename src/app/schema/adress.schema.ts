import * as z from 'zod';

export const addressSchema = z.object({
  city: z.string().min(2, { message: "City is required" }),
  details: z.string().min(2, { message: "Details is required" }),
  phone: z.string()
    .nonempty("Phone number is required")
    .regex(/^(?:002)?01[0-25][0-9]{8}$/, "Not a valid Egyptian phone number")
})

export type addressSchemaForm = z.infer<typeof addressSchema>;