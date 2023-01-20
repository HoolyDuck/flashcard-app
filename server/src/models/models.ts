import { sequelize } from "../db";
import { DataTypes, INTEGER } from "sequelize";

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING}
})

const Topic = sequelize.define('topic', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING}
})

const Card = sequelize.define('card', {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        question: {type: DataTypes.STRING, allowNull:false},
        answer: {type: DataTypes.STRING},
        progress: {type: DataTypes.INTEGER, defaultValue: 0}
})

User.hasMany(Topic)
Topic.belongsTo(User)

Topic.hasMany(Card)
Card.belongsTo(Topic)

module.exports = {
    User, Topic, Card
}