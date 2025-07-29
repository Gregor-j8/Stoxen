export interface User {
  id: number;
  username: string;
  email: string;
  full_name?: string;
  disabled?: boolean;
}