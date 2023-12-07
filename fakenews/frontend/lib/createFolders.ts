import { getCategories } from '@/app/api/categories';
import fs from 'fs-extra';

async function createCategoryFolders() {
    try {
      const categories = await getCategories();

      for (const category of categories) {
        const folderName = `./pages/${category}`;
        const folderExists = await fs.pathExists(folderName);
        const pagePath = `${folderName}/page.tsx`;
        const pageExists = await fs.pathExists(pagePath);

        if (!folderExists) {
          await fs.ensureDir(folderName);
        }

        if (!pageExists) {
          const content = `export default function ${category.charAt(0).toUpperCase() + category.slice(1)}() {
            return (
              <div>
                <h1>${category} oldal</h1>
                {/* Itt jelenítsd meg a kategóriához tartozó tartalmat */}
              </div>
            );
          }`;

          await fs.writeFile(pagePath, content);
        }
      }
      console.log('Kategóriák ellenőrizve és szükség esetén létrehozva!');
    } catch (err) {
      console.error('Hiba történt:', err);
    }
  }

  export default createCategoryFolders;


