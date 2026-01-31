export class CreateContactRequest {
  first_name: string;
  last_name?: string | null;
  email?: string | null;
  phone?: string | null;
}

export class ContactResponse {
  id: number;
  first_name: string;
  last_name?: string | null;
  email?: string | null;
  phone?: string | null;
}

export class UpdateContactRequest {
  id: number;
  first_name: string;
  last_name?: string;
  email?: string;
  phone?: string;
}

export class SearchContactRequest {
  name?: string; // Added '?' to make it optional
  email?: string; // Added '?' to make it optional
  phone?: string; // Added '?' to make it optional
  page: number; // Keep required
  size: number; // Keep required
}