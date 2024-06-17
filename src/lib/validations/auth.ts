import * as z from 'zod'

export const userAuthSchema = z.object({
  email: z
    .string()
    .email({ message: 'Invalid email format' })
    .transform((str) => str.trim()),
})
