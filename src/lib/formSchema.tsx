import { z } from "zod";

export const userInfoSchema = z.object({
  name: z.string().min(1, "First name is required"),
  birthDate: z.coerce.date()
});

export const vehicleInfoSchema = z.object({
  make: z.string().min(1, "Manufacturer is required"),
  model: z.string().min(1, "Model is required"),
  year: z.coerce.number().min(1, "Model year is required"),
  value: z.coerce.number().min(1, "Car Valuation is required"),
});

export const driverInfoSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  licenseNumber: z.string().min(1, "License number is required"),
});

export const recordsSchema = z.object({
  faultAccidents: z.string().min(1, "required "),
  convictions: z.string().min(1, "required"),
  revocations: z.string().min(1, "required"),
});

export type Inputs = z.infer<
  typeof userInfoSchema | typeof driverInfoSchema | typeof vehicleInfoSchema
>;
