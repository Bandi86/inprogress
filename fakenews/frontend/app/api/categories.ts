import axios from 'axios';
import { baseUrl } from '@/lib/utils';

export const getCategories = async () => {
    const response = await axios.get(baseUrl + '/categories');
    return response.data;
}