import { baseUrl } from './utils';
import axios from 'axios';

export const categories = ['filmek', 'sorozatok', 'pc', 'konzol'];

export const createCategories = async () => {
  try {
    // Categories lekérése az adatbázisból
    const res = await axios.get(`${baseUrl}/categories`);

    // Ellenőrzés, hogy létező kategóriák között van-e a listában szereplő kategória
    res.data.forEach((category: any) => {
      if (categories.includes(category.name)) {
        console.log(`Kategória már létezik: ${category.name}`);
        const index = categories.indexOf(category.name);
        if (index !== -1) {
          categories.splice(index, 1);
        }
      }
    });

    // Új kategóriák létrehozása azokból, amik nem voltak még az adatbázisban
    for (const category of categories) {
      const existingCategory = res.data.find((c: any) => c.name === category);
      if (!existingCategory) {
        await axios.post(`${baseUrl}/categories`, { name: category });
        console.log(`Kategória feltöltve: ${category}`);
      } else {
        console.log(`Kategória már létezik az adatbázisban: ${category}`);
      }
    }
  } catch (error) {
    console.error('Hiba történt az adatok feltöltésekor:', error);
  }
};





