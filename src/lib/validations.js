import { z } from 'zod';

export const registrationSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name is too long'),
  email: z
    .string()
    .email('Please enter a valid email address')
    .max(255, 'Email is too long'),
  college: z
    .string()
    .min(2, 'College name must be at least 2 characters')
    .max(200, 'College name is too long'),
  yearOfStudy: z.enum(['1st Year', '2nd Year', '3rd Year', '4th Year', 'Postgraduate', 'PhD', 'Other'], {
    errorMap: () => ({ message: 'Please select your year of study' }),
  }),
  domain: z.enum(['Tech', 'Non-Tech'], {
    errorMap: () => ({ message: 'Please select a domain' }),
  }),
  whyInterested: z
    .string()
    .min(20, 'Please write at least 20 characters')
    .max(1000, 'Response is too long (max 1000 characters)'),
});

export const adminLoginSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
});
