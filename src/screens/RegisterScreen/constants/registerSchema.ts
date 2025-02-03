import {z} from 'zod';

export const registerSchema = z
  .object({
    name: z.string().optional(),
    email: z
      .string({required_error: 'Email is required'})
      .trim()
      .nonempty('Email is required')
      .email('Invalid email format'),
    password: z
      .string({required_error: 'Password is required'})
      .trim()
      .nonempty('Password is required')
      .min(8, 'Password must be at least 8 characters'),
    confirmPassword: z
      .string({required_error: 'Confirm Password is required'})
      .trim()
      .nonempty('Confirm Password is required')
      .min(8, 'Confirm Password must be at least 8 characters'),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type registerSchema = z.infer<typeof registerSchema>;
