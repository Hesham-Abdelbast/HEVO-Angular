
export const Base_URL = 'https://localhost:44335/';

export const URLs = {
  LOGIN : 'Login',
  REGISTER: 'Register',
  HOME : 'Home',
}

export class AuthURLs {
  static readonly LOGIN = Base_URL + 'api/Auth/Login';
  static readonly REGISTER = Base_URL + 'api/Auth/Register';
}
