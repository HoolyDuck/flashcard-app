"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../db");
const sequelize_1 = require("sequelize");
const User = db_1.sequelize.define('user', {
    id: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: sequelize_1.DataTypes.STRING, unique: true },
    password: { type: sequelize_1.DataTypes.STRING },
});
const Topic = db_1.sequelize.define('topic', {
    id: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    description: { type: sequelize_1.DataTypes.STRING },
});
const Card = db_1.sequelize.define('card', {
    id: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    question: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    answer: { type: sequelize_1.DataTypes.STRING },
    progress: { type: sequelize_1.DataTypes.INTEGER, defaultValue: 0 },
});
User.hasMany(Topic);
Topic.belongsTo(User);
Topic.hasMany(Card);
Card.belongsTo(Topic);
module.exports = {
    User, Topic, Card
};
//# sourceMappingURL=models.js.map