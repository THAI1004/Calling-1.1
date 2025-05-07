// config/db.js
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('calling', 'calling', 'Calling@2025', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306, // hoặc 3307 nếu bạn dùng port đó
});

export default sequelize;

//