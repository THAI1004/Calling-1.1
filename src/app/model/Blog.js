// models/Content.js
import { DataTypes } from 'sequelize';
import sequelize from '../../config/database.js';

const Content = sequelize.define('blog', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    thumbnail: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    content: {
        type: DataTypes.TEXT('long'),
        allowNull: false
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    status: {
        type: DataTypes.INTEGER,
        defaultValue: 1
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'blog',
    timestamps: false
});

export default Content;
