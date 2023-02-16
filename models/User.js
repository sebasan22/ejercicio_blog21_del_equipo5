const { Model, DataTypes } = require("sequelize");
const Role = require("./Role");

class User extends Model {
  static initModel(sequelize) {
    User.init(
      {
        id: {
          type: DataTypes.BIGINT.UNSIGNED,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        username: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: "user",
      },
    );
    return User;
  }
  async getrol() {
    let role = await Role.findByPk(this.rolId);
    return role.dataValues;
  }
}

module.exports = User;
