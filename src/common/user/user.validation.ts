import { z, ZodType } from 'zod';
import { UserLoginRequest, UserRegisterRequest } from '../../model/user.model';

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
}
