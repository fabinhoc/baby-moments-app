export interface UpdatePasswordDto {
  current_password: string | null;
  password: string | null;
  password_confirmation: string | null;
}
