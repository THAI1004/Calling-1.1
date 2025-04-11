// src/app/model/LienHe.js
import { DataTypes } from 'sequelize';
import sequelize from '../../config/database.js'; // đường dẫn tới file config sequelize

const LienHe = sequelize.define('LienHe', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    project: {
        type: DataTypes.STRING,
        allowNull: true
    },
    subject: {
        type: DataTypes.STRING,
        allowNull: true
    },
    message: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'lienhe',
    timestamps: false // Nếu bạn không có trường updated_at
});

export default LienHe;
