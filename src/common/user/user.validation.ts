import { z, ZodType } from 'zod';
import {
  UserLoginRequest,
  UserRegisterRequest,
  UserUpdateRequest,
} from '../../model/user.model';

export class UserValidation {
  static readonly REGISTER: ZodType<UserRegisterRequest> = z.object({
    username: z
      .string()
      .min(1)
      .regex(/^[A-Z].*$/, {
        message: 'Username must be start with uppercase letters.',
      }),
    password: z.string().min(1),
    name: z.string().min(1),
  });
  static readonly LOGIN: ZodType<UserLoginRequest> = z.object({
    username: z
      .string()
      .min(1)
      .regex(/^[A-Z].*$/, {
        message: 'Username must be start with uppercase letters.',
      }),
    password: z.string().min(1),
  });
  static readonly UPDATE: ZodType<UserUpdateRequest> = z.object({
    name: z.string().min(1).optional(),
    password: z.string().min(1).optional(),
  });
}
