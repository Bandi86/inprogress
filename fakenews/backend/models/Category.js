import Sequelize from 'sequelize';
import db from '../db/config.js';
import { DataTypes } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';

const Category = db.define('category', {
    categoryId: {
        type: DataTypes.UUID,
        defaultValue: () => uuidv4(),
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
    },
    createdAt: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false,
    },
    updatedAt: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false,
    },
    });

    export default Category;