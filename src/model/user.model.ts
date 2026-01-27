import { z } from 'zod';

export class UserRegisterRequest {
  username: string;
  password: string;
  name: string;
}

export class UserResponse {
  username: string;
  name: string;
  token?: string | null;
}

export class UserLoginRequest {
  username: string;
  password: string;
}

export const userLoginValidation = z.object({
  username: z.string().min(1).max(5),
  password: z.string().min(1).max(5),
});
