import UserAnswer from '../models/userAnswer.js';

//Felhasználó válaszainak mentése:
export const saveUserAnswer = async (req, res) => {
  const { userId, questionId, selectedOptionIndex } = req.body;

  try {
    const userAnswer = await UserAnswer.create({
      userId: userId,
      questionId: questionId,
      selectedOptionIndex: selectedOptionIndex,
    });

    res.status(201).json(userAnswer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to save user answer' });
  }
};

//Felhasznalo osszes valasz lekérdezése:
export const getAnswers = async (req, res) => {
  const { questionId } = req.params;
  const userAnswers = await UserAnswer.findAll({
    where: {
      questionId,
    },
  });
  res.status(200).json(userAnswers);
};

//Felhasználó válaszainak lekérése egy adott kérdéshez:
export const getUserAnswersForQuestion = async (req, res) => {
  const questionId = req.params.questionId;

  try {
    const userAnswers = await UserAnswer.findAll({
      where: { questionId: questionId },
    });

    res.status(200).json(userAnswers);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: 'Failed to fetch user answers for question' });
  }
};
