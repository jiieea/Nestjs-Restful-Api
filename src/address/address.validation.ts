import { z, ZodType } from 'zod';
import {
  CreateAddressRequest,
  GetAddressRequest,
  UpdateAddressRequest,
} from '../model/address.model';

export class AddressValidation {
  static readonly CREATE: ZodType<CreateAddressRequest> = z.object({
    street: z.string().min(1).max(255),
    city: z.string().min(1).max(100),
    province: z.string().min(1).max(100),
    country: z.string().min(1).max(100),
    contact_id: z.number().min(1),
    postal_code: z.string().min(1).max(100),
  });

  static readonly GET: ZodType<GetAddressRequest> = z.object({
    address_id: z.number().min(1).positive(),
    contact_id: z.number().min(1).positive(),
  });

  static readonly UPDATE: ZodType<UpdateAddressRequest> = z.object({
    street: z.string().min(1).max(255),
    id: z.number().min(1).positive(),
    city: z.string().min(1).max(100),
    province: z.string().min(1).max(100),
    country: z.string().min(1).max(100),
    contact_id: z.number().min(1),
    postal_code: z.string().min(1).max(100),
  });
}
