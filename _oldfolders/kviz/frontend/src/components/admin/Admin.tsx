/* question example
 {
    "questionText": "Ki volt az első ember a világűrben?",
    "options": ["Neil Armstrong", "Buzz Aldrin", "Yuri Gagarin", "John Glenn"],
    "correctOptionIndex": 2,
    "category": "Történelem",
    "difficulty": "medium"
  }
*/

import { useState } from 'react';
import axios from 'axios';
import { convertToEnglish } from '../../type/textconversion.d';


type FormData = {
  question: string;
  answers: string[];
  index: number;
  category: string;
  difficulty: string;
};

const Admin = () => {



  const [formData, setFormData] = useState<FormData>({
    question: '',
    answers: ['', '', '', ''],
    index: 0,
    category: '',
    difficulty: '',
  });

  const handleForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Konvertálj minden textet convertToEnglish függvénnyel
    const convertedFormData = {
      ...formData,
      question: convertToEnglish(formData.question),
      answers: formData.answers.map(answer => convertToEnglish(answer)),
      category: convertToEnglish(formData.category),
    };

   // api post
   console.log(convertedFormData);
   console.log(formData)
   console.log(formData.answers)
   axios.post('http://localhost:8000/questions', convertedFormData);

  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, id } = e.target;
  
    if (type === 'checkbox') {
      setFormData({
        ...formData,
        difficulty: value,
      });
    } else if (name === 'answers') {
      const updatedAnswers = [...formData.answers];
      const index = parseInt(id, 10); // Az ID-t számra konvertáljuk
      updatedAnswers[index] = value; // A válasz értékét beállítjuk az adott indexen
      setFormData({
        ...formData,
        answers: updatedAnswers,
      });
    } else if (type === 'radio' && name === 'difficulty') {
      if (e.target.checked) {
        setFormData({
          ...formData,
          difficulty: value,
        });
      }
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };
  
  

  return (
    <div>
      Uj kerdes Bekuldese
      <br />
      <form onSubmit={handleForm}>
        <label>Kerdes:</label>
        <input type='text' name='question' onChange={handleChange} />

        <label>Valaszok:</label>
        <input
          type='text'
          name='answers'
          id='0'
          onChange={handleChange}
          placeholder='Válasz 1'
        />
        <input
          type='text'
          name='answers'
          id='1'
          onChange={handleChange}
          placeholder='Válasz 2'
        />
        <input
          type='text'
          name='answers'
          id='2'
          onChange={handleChange}
          placeholder='Válasz 3'
        />
        <input
          type='text'
          name='answers'
          id='3'
          onChange={handleChange}
          placeholder='Válasz 4'
        />

        <label>Jo valasz szama</label>
        <input type='number' id='index' onChange={handleChange} />

        <label>Kategória:</label>
        <input type='text' name='category' onChange={handleChange} />

        <label>Nehezseg</label>
        <input
          type='radio'
          name='difficulty'
          value='easy'
          onChange={handleChange}
        />
        <label>Konnyu</label>
        <input
          type='radio'
          name='difficulty'
          value='medium'
          onChange={handleChange}
        />
        <label>Kozepes</label>
        <input
          type='radio'
          name='difficulty'
          value='hard'
          onChange={handleChange}
        />
        <label>Nehez</label>

        <button type='submit'>Bekuldes</button>
      </form>
    </div>
  );
};

export default Admin;

