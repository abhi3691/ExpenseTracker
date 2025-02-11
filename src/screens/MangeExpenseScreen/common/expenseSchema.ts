import {z} from 'zod';

export const expenseSchema = z.object({
  description: z
    .string({
      required_error: 'Description  is required',
    })
    .trim()
    .nonempty('Description is required'),
  amount: z
    .string({
      required_error: 'Amount is required',
    })
    .trim()
    .nonempty('Amount is required')
    .regex(/^\d+(\.\d+)?$/, 'Amount must be a number'),
  date: z.string({
    required_error: 'Date is required',
  }),
});

export type expenseSchema = z.infer<typeof expenseSchema>;
