import Questions from '../models/questions.js';
import Category from '../models/category.js';

//get all questions
export const getQuestions = async (req, res) => {
  try {
    const questions = await Questions.findAll();

    // Manuálisan hozzáadunk egy categoryName mezőt a lekért kérdésekhez
    for (const question of questions) {
      const category = await Category.findByPk(question.categoryId);
      question.dataValues.categoryName = category ? category.name : null;
    }

    res.status(200).json({ questions, length: questions.length });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

//get questions by categories
export const getQuestionsByCategory = async (req, res) => {
  try {
    let { categorys } = req.params;
    // Ha tömbként érkezik a kategória, vegyük az első elemét
    categorys = Array.isArray(categorys) ? categorys[0] : categorys;
    console.log(categorys);
    const questions = await Questions.findAll({
      where: {
        categoryId: categorys, // A categoryId-nek kell megfelelnie az adatbázisban lévő mezőnek
      },
    });

    res.status(200).json({ questions, length: questions.length, category });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Valami hiba történt a lekérdezés során' });
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
  console.log(req.body);
  try {
    let categoryId;

    if (!['easy', 'medium', 'hard'].includes(difficulty)) {
      return res.status(404).json({ error: 'Invalid difficulty' });
    }

    let existingCategory = await Category.findOne({
      where: { name: category },
    });

    if (!existingCategory) {
      existingCategory = await Category.create({
        name: category,
      });
    }

    categoryId = existingCategory.id;

    const questionDB = await Questions.create({
      questionText,
      options,
      correctOptionIndex,
      categoryId,
      difficulty,
    });

    res.status(201).json({ message: 'Question saved to database', questionDB });
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
