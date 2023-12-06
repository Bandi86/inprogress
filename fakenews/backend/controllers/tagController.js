import Tag from '../models/Tags.js';

export const getAllTag = async (req, res) => {
  // give back all tag
  try {
    const tags = await Tag.findAll();
    res.status(200).json(tags);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createTag = async (req, res) => {
  // create new tag
  const { name } = req.body;
  try {
    // check if tag already exists
    const existingTag = await Tag.findOne({ where: { name: name } });

    if (existingTag) {
      return res.status(400).json({ message: 'Tag already exists' });
    }
    
    const newTag = await Tag.create({ name });
    res.status(201).json(newTag);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
