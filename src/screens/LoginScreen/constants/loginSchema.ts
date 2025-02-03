import {z} from 'zod';

export const loginSchema = z.object({
  email: z
    .string({
      required_error: 'Email is required',
    })
    .trim()
    .nonempty('Email is required')
    .email('Invalid email format'),
  password: z
    .string({
      required_error: 'Password is required',
    })
    .trim()
    .nonempty('Password is required')
    .min(8, 'Password must be at least 8 characters'),
});

export type loginSchema = z.infer<typeof loginSchema>;
