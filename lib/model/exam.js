// exam class model using sequelize
const { Model, DataTypes, Sequelize } = require('sequelize');
// const sequelize = require('../db/connection');
const sequelize = new Sequelize('eary', 'root', 'root', {
    host: '127.0.0.1',
    dialect: 'mysql'
}); 

class Exam extends Model {

}
Exam.init({
    // id is auto increment and primary key
    id: {   
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    date: DataTypes.DATE,
    total_score: DataTypes.FLOAT,
    // id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    // belongsTo: DataTypes.INTEGER,

}, {
    sequelize,
    modelName: 'Exam',

    tableName: 'Exams',
    timestamps: false
});
module.exports =Exam;
