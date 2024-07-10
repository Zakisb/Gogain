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

export const licensesTypeColumn = z.object({
  id: z.number(),
  name: z.string().min(1),
  price: z.number().min(1),
  numberOfUsers: z.number().min(1),
});

export type LicensesTypeColumn = z.infer<typeof licensesTypeColumn>;

export const licensePurchasedColumn = z.object({
  licenseKeyId: z.number(),
  licenseType: licensesTypeColumn, // Adjust this if you have a specific schema for LicenseType
  organizationId: z.number(),
  organization: z.string(), // Adjust this if you have a specific schema for Organization
  createdAt: z.date(),
  validUntil: z.date(),
  deleted: z.boolean(),
  price: z.number(),
  status: z.enum([
    "PENDING",
    "APPROVED",
    "REJECTED",
    "EXPIRED",
    "SUSPENDED",
    "INACTIVE",
    "ACTIVE",
  ]),
});

export type LicensePurchasedColumn = z.infer<typeof licensePurchasedColumn>;

export const organizationsColumn = z.object({
  id: z.number(),
  name: z.string().min(1),
  deleted: z.boolean(),
  industry: z.string().min(1),
  createdAt: z.date(),
  mainOrg: z.boolean(),
});

export type OrganizationsColumn = z.infer<typeof organizationsColumn>;

const accountsColumn = z.object({
  id: z.number(),
  userId: z.number(),
  role: z.string().min(1),
  isMainAccount: z.boolean(),
});

export const usersColumn = z.object({
  id: z.number(),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().min(1),
  role: z.string().min(1),
  createdAt: z.date(),
  accounts: z.array(accountsColumn),
  isActive: z.boolean(),
});

export type UsersColumn = z.infer<typeof usersColumn>;

export const MessageSchema = z.object({
  id: z.string(),
  text: z.string(),
  isUserMessage: z.boolean(),
});

// array validator
export const MessageArraySchema = z.array(MessageSchema);

export type Message = z.infer<typeof MessageSchema>;
