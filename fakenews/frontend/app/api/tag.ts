import axios from 'axios';
import { baseUrl } from '@/lib/utils';

export const getAllTags = async () => {
  try {
    const response = await axios.get(`${baseUrl}/tags`);
    const tags = response.data.tags;
    return tags;
  } catch (error) {
    throw new Error(`Hiba történt a címkék lekérésekor: ${error}`);
  }
};

export const getTagById = async (id: string | undefined) => {
  try {
    const response = await axios.get(`${baseUrl}/tags/${id}`);
    const tag = response.data.tag;
    return tag;
  } catch (error) {
    throw new Error(`Hiba történt a címke lekérésekor: ${error}`);
  }
};

export const createTag = async (name: string) => {
  try {
    const response = await axios.post(`${baseUrl}/tags`, { name });
    
    
    const tag = response.data;
    return tag;
  } catch (error) {
    throw new Error(`Hiba történt a címke létrehozásakor: ${error}`);
  }
};
