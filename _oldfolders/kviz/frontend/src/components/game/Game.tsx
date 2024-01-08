import { useEffect, useState } from 'react';

import { fetchCategories, selectQuestionsByCategory } from '../../api/api';

type GameProps = {
  userId: string | null;
  // További propertik a játékhoz...
};

const Game: React.FC<GameProps> = ({ userId }) => {
  const [questionCategories, setQuestionCategories] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [questions, setQuestions] = useState<any[]>([]);
  console.log(selectedCategories);
  

  useEffect(() => {
    fetchCategories().then((res) => {
      if (res.data.length > 0) {
        const tempCategories: string[] = res.data.map(
          (element: { name: string }) => element.name
        );
        setQuestionCategories(tempCategories);
      }
    });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    if (checked) {
      setSelectedCategories([...selectedCategories, name]);
    } else {
      setSelectedCategories(selectedCategories.filter((item) => item !== name));
    }
  };

  const gameStart = () => {
    if (selectedCategories.length > 0) {
      selectQuestionsByCategory(selectedCategories).then((res: any) => {
        setQuestions(res.data.questions);
      });
    } else {
      alert('Kérlek válassz legalább egy kategóriát');
    }
  };

  return (
    <div className='py-20 mx-auto text-center flex flex-col items-center max-w-3xl'>
      <h2>
        Valassz milyen kategoraju kerdeseket szeretnel, tobbet is valaszthatsz
      </h2>
      {questionCategories.length > 0 ? (
        questionCategories.map((item) => (
          <div key={item}>
            <input
              type='checkbox'
              id={item}
              name={item}
              onChange={handleChange}
            />
            <label htmlFor={item}>{item}</label>
          </div>
        ))
      ) : (
        <h2>jelenleg nincs kategoria</h2>
      )}
      <div>
        <button onClick={gameStart}>Játék indítása</button>
        {questions.length > 0 && (
          <div>
            {questions.map((question: any, index: number) => (
              <div key={index}>
                <h2>{question.questionText}</h2>
                {question.options.map((option: string, idx: number) => (
                  <p key={idx}>{option}</p>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Game;
