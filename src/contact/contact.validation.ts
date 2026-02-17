import { z, ZodType } from 'zod';
import {
  CreateContactRequest,
  SearchContactRequest,
  SearchGloballyContactRequest,
  UpdateContactRequest,
} from '../model/contact.model';

export class ContactValidation {
  static readonly CREATE: ZodType<CreateContactRequest> = z.object({
    first_name: z.string().min(1).max(100),
    last_name: z.string().min(1).max(100).optional(),
    email: z.string().min(1).max(100).optional(),
    phone: z.string().min(1).max(10).optional(),
  });

  static readonly UPDATE: ZodType<UpdateContactRequest> = z.object({
    id: z.number().positive(),
    first_name: z.string().min(1).max(100),
    last_name: z.string().min(1).max(100).optional(),
    email: z.string().min(1).max(100).optional(),
    phone: z.string().min(1).max(10).optional(),
  });

  static readonly SEARCH: ZodType<SearchContactRequest> = z.object({
    name: z.string().min(1).optional(),
    email: z.string().min(1).optional(),
    phone: z.string().min(1).optional(),
    page: z.number().positive().min(1),
    size: z.number().positive().min(1),
  });

  static readonly SEARCHGLOBAL: ZodType<SearchGloballyContactRequest> =
    z.object({
      search: z.string().min(1).optional(),
      page: z.coerce.number().positive().min(1).optional(),
      size: z.coerce.number().positive().min(1).optional(),
    });
}
