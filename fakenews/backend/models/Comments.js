/* import { DataTypes, Sequelize } from 'sequelize';
import db from '../db/config.js';

import { v4 as uuidv4 } from 'uuid';

const Comments = db.define('comment', {
  commentId: {
    type: DataTypes.UUID,
    defaultValue: () => uuidv4(),
    allowNull: false,
    primaryKey: true,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  commentedAt: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW,
  },
});

export default Comments; */
