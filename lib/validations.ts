import { z } from 'zod';

/**
 * Schema for validating book form data
 */
export const bookFormSchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
  author: z.string().nullable().optional().transform((val) => val || undefined),
  editionName: z.string().nullable().optional().transform((val) => val || undefined),
  yearOfPublication: z.string().nullable().optional().transform((val) => {
    if (!val) return undefined;
    const date = new Date(val);
    return isNaN(date.getTime()) ? undefined : date.getFullYear();
  }),
  ean13: z.string().nullable().optional().transform((val) => {
    if (!val) return undefined;
    const num = Number(val);
    return isNaN(num) ? undefined : num;
  }).refine((val) => !val || val.toString().length === 13, {
    message: 'EAN13 must be exactly 13 digits',
  }),
  copyNum: z.string().min(1, { message: 'Copy number is required' }).transform((val) => Number(val)),
  loanableStatus: z.enum(['available on site', 'loanable'], {
    errorMap: () => ({ message: 'Please select a loanable status' }),
  }),
  summary: z.string().nullable().optional().transform((val) => val || undefined),
  coverURL: z.string().nullable().optional().transform((val) => {
    if (!val || val === '') return undefined;
    try {
      new URL(val);
      return val;
    } catch {
      return undefined;
    }
  }).refine((val) => !val || val.length > 0, {
    message: 'Invalid URL format',
  }),
  genre: z.string().nullable().optional().transform((val) => {
    if (!val || val === '') return undefined;
    return val;
  }),
});

export type BookFormData = z.infer<typeof bookFormSchema>;

/**
 * Schema for validating user signup form data
 */
export const signupFormSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});

export type SignupFormData = z.infer<typeof signupFormSchema>;

/**
 * Schema for validating user login form data
 */
export const loginFormSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(1, { message: 'Password is required' }),
});

export type LoginFormData = z.infer<typeof loginFormSchema>;

/**
 * Schema for validating member form data
 */
export const memberFormSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  email: z.string().email({ message: 'Invalid email address' }),
  phone: z.string().nullable().optional().transform((val) => val || undefined),
  address: z.string().nullable().optional().transform((val) => val || undefined),
});

export type MemberFormData = z.infer<typeof memberFormSchema>;

/**
 * Type for action results
 */
export type ActionResult<T = unknown> = 
  | { success: true; data: T }
  | { success: false; error: string; fieldErrors?: Record<string, string[]> };

