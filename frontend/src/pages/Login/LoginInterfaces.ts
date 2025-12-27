export interface LoginForm {
  email: string;
  password: string;
}

export interface SignUpForm extends LoginForm {
  first_name: string;
  last_name: string;
  confirm_password: string;
}

export interface ResetPasswordForm {
  email: string;
}
