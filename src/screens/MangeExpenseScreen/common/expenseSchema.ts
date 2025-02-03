import {z} from 'zod';

export const expenseSchema = z.object({
  description: z
    .string({
      required_error: 'Expense name is required',
    })
    .trim()
    .nonempty('Expense name is required')
    .max(50, 'Expense name must be at most 50 characters'),

  amount: z.string({
    required_error: 'Amount is required',
  }),
  date: z.string({
    required_error: 'Date is required',
  }),
});

export type expenseSchema = z.infer<typeof expenseSchema>;
