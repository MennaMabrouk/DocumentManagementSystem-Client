export interface RegisterUserDto {
    username: string;
    password: string;
    confirmPassword: string;
    email: string;
    nid: string;
    gender?: string;
    workspaceName: string;
    phoneNumber?: string;
  }