// src/app/model/Account.js
import { DataTypes } from 'sequelize';
import sequelize from '../../config/database.js';

const Account = sequelize.define('Account', {
    fullname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.ENUM('0', '1'), // '0' = user thường, '1' = admin
        allowNull: false,
        defaultValue: '0'
    }
}, {
    tableName: 'account',
    timestamps: false
});

export default Account;
