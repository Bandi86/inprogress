import axios from 'axios';
import { cookies } from 'next/headers';

export default function axiosCookie(): void {
    const cookieStore = cookies();
    const token = cookieStore.get('jwt');

    axios.interceptors.request.use(
        (config: any) => {
            if (token) {
                config.headers['Cookie'] = `token=${token}`;
            }
            return config;
        },
        (error: any) => {
            Promise.reject(error);
        }
    );
}

