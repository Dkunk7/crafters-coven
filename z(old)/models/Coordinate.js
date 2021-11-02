// I think I'm gonna combine Coordinate and Note, so Note has a "is_coordinate" value
// This way, I don't have to worry about separating comments between two models

// const { Model, DataTypes } = require(`sequelize`);

// const sequelize = require(`../config/connection`);

// class Coordinate extends Model {}

// Coordinate.init(
//     {
//         id: {
//             type: DataTypes.INTEGER,
//             allowNull: false,
//             primaryKey: true,
//             autoIncrement: true
//         },
//         title: {
//             type: DataTypes.STRING,
//             allowNull: false
//         },
//         coordinates: {
//             type: DataTypes.STRING,
//             allowNull: false
//         },
//         user_id: {
//             type: DataTypes.INTEGER,
//             references: {
//                 model: `user`,
//                 key: `id`
//             }
//         }
//     },
//     {
//         sequelize,
//         timestamps: false,
//         freezeTableName: true,
//         underscored: true,
//         modelName: `coordinate`
//     }
// );

// module.exports = Coordinate;