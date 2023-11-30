import axios from 'axios';

export const fetchCategories = () => {
  return axios.get('http://localhost:8000/categories');
};

export const selectQuestionsByCategory = (categorys: string[]) => {
  const config = {
    params: {
      categorys,
    },
  };
  console.log(config);
  

  const questions = axios.get('http://localhost:8000/questions', config);

  return questions;
};
