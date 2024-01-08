import axios from 'axios';

export interface ApiUrls {
  loginAPI: string;
  signupAPI: string;
  userAPI: string;
  logoutAPI: string;
}

export const apiUrls: ApiUrls = {
  loginAPI: 'http://localhost:8000/api/v1/auth/login',
  userAPI: 'http://localhost:8000/api/v1/users',
  signupAPI: 'http://localhost:8000/api/v1/auth/register',
  logoutAPI: 'http://localhost:8000/api/v1/auth/logout',
};

export const useAxios = async (method: string, url: string, data: any) => {
  let res;

  if (method === 'GET') {
    res = await axios.get(url, { withCredentials: true });
  } else if (method === 'POST') {
    res = await axios.post(url, data, { withCredentials: true });
  } else if (method === 'PUT') {
    res = await axios.put(url, data, { withCredentials: true });
  } else if (method === 'PATCH') {
    res = await axios.patch(url, data, { withCredentials: true });
  } else if (method === 'DELETE') {
    res = await axios.delete(url, { withCredentials: true });
  }
  return res;  
};
