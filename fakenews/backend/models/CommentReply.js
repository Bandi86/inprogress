/* import { DataTypes } from 'sequelize';
import db from '../db/config.js';
import { v4 as uuidv4 } from 'uuid';

const CommentReply = db.define('comment_reply', {
  replyId: {
    type: DataTypes.UUID,
    defaultValue: () => uuidv4(),
    primaryKey: true,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  repliedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false,
  },
});

export default CommentReply; */
