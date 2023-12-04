import Tag from '../models/Tags.js';

export const getAllTag = async (req,res) => {
// give back all tag
try {
    const tags = await Tag.findAll();
    res.status(200).json(tags);
} catch (error) {
    res.status(404).json({ message: error.message });
}
}