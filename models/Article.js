const { Model, DataTypes } = require("sequelize");
const User = require("./User");

class Article extends Model {
  static initModel(sequelize) {
    Article.init(
      {
        id: {
          type: DataTypes.BIGINT.UNSIGNED,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        title: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        content: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        img: {
          type: DataTypes.STRING,
        },
      },
      {
        sequelize,
        modelName: "article",
      },
    );

    return Article;
  }
  async getAuthor() {
    let author = await User.findByPk(this.userId);
    return author.dataValues;
  }
}

module.exports = Article;
