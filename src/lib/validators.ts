import { z } from "zod";

// Example
export const employeeFormSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  gender: z.string().min(1),
});

export type EmployeeFromValues = z.infer<typeof employeeFormSchema>;

export const employeeColumn = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  gender: z.string(),
  createAt: z.string(),
  updateAt: z.string(),
});

export type EmployeeColumn = z.infer<typeof employeeColumn>;

export const updateEmployeeFormSchema = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  gender: z.string(),
});

export const licenseColumn = z.object({
  id: z.number(),
  name: z.string().min(1),
  price: z.number().min(1),
  numberOfUsers: z.number().min(1),
});

export type LicenseColumn = z.infer<typeof licenseColumn>;
