import Questions from '../models/questions.js';
import Category from '../models/category.js';

//get all questions
export const getQuestions = async (req, res) => {
  try {
    const questions = await Questions.findAll();
    res.status(200).json(questions);
  } catch (error) {
    console.log(error);
  }
};

//get one question by id
export const getQuestion = async (req, res) => {
  const questionId = req.params.questionId;
  try {
    const question = await Questions.findByPk(questionId);
    if (!question) {
      return res.status(404).json({ message: 'Question not found!' });
    }
    res.status(200).json(question);
  } catch (error) {
    console.log(error);
  }
};

//create question
export const createQuestion = async (req, res) => {
  const { questionText, options, correctOptionIndex, category, difficulty } =
    req.body;
  try {
    let categoryId;

    if (!['easy', 'medium', 'hard'].includes(difficulty)) {
      return res.status(404).json({ error: 'Invalid difficulty' });
    }

    const existingCategory = await Category.findOne({
      where: { name: category },
    });

    if (existingCategory) {
      categoryId = existingCategory.id;
    } else {
      throw new Error('Category not found');
    }

    const questionDB = await Questions.create({
      questionText: questionText,
      options: options,
      correctOptionIndex: correctOptionIndex,
      categoryId: categoryId,
      difficulty: difficulty,
    });

    res.status(201).json({message: "Question saved to database" , questionDB});
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to create question' });
  }
};

//update question
export const updateQuestion = async (req, res) => {
  const questionId = req.params.questionId;
  const { question, answer, categoryId } = req.body;
  try {
    const questionDB = await Questions.findByPk(questionId);
    if (!questionDB) {
      return res.status(404).json({ message: 'Question not found!' });
    }
    const updatedQuestion = await questionDB.update({
      question: question,
      answer: answer,
      categoryId: categoryId,
    });
    res.status(200).json(updatedQuestion);
  } catch (error) {
    console.log(error);
  }
};

//delete question
export const deleteQuestion = async (req, res) => {
  const questionId = req.params.questionId;
  try {
    const questionDB = await Questions.findByPk(questionId);
    if (!questionDB) {
      return res.status(404).json({ message: 'Question not found!' });
    }
    await questionDB.destroy();
    res.status(204).json({ message: 'Question deleted!' });
  } catch (error) {
    console.log(error);
  }
};
