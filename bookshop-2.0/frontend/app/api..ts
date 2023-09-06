export interface ApiUrls {
  loginAPI: string;
  userAPI: string;
}

export const apiUrls: ApiUrls = {
  loginAPI: 'http://localhost:8000/api/v1/auth/login',
  userAPI: 'http://localhost:8000/api/v1/users',
};
