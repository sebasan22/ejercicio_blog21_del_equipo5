const { Model, DataTypes } = require("sequelize");

class Comment extends Model {
  static initModel(sequelize) {
    Comment.init(
      {
        content: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        createdAt: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        updatedAt: {
          type: DataTypes.DATE,
        },
      },
      {
        sequelize,
        modelName: "comment",
      },
    );
    return Comment;
  }
}

module.exports = Comment;
