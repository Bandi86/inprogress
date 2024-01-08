import { apiUrls, useAxios } from '../api/api';

const logout = async () => {
  try {
    const res = await useAxios('GET', apiUrls.logoutAPI, '');
    if (res && res.status === 200) {
      localStorage.removeItem('user');
      console.log('Logout success');
    }
  } catch (error: any) {
    console.error('Logout failed:', error.message);
  }
};

export default logout;
