const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  "blog_ejercicio21", // Ej: hack_academy_db
  "root", // Ej: root
  "root", // Ej: root
  {
    host: "localhost", // Ej: 127.0.0.1
    dialect: "mysql", // Ej: mysql
  },
);

const User = require("./User");
const Comment = require("./Comment");
const Article = require("./Article");

User.initModel(sequelize);
Comment.initModel(sequelize);
Article.initModel(sequelize);

/**
 * Luego de definir los modelos, se pueden establecer relaciones entre los
 * mismos (usando métodos como belongsTo, hasMany y belongsToMany)...
 */

module.exports = {
  sequelize,
  User,
  Comment,
  Article,
};
