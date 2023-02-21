const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcryptjs");

//const Role = require("./Role");

class User extends Model {
  async isValidPassword(password) {
    return await bcrypt.compare(password, this.password);
  }
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
        roleName: { type: DataTypes.STRING, allowNull: true },
        roleCode: { type: DataTypes.INTEGER, allowNull: true },
      },
      {
        sequelize,
        paranoid: true,
        deletedAt: "destroyTime",
        modelName: "user",
      },
    );
    return User;
  }
  /*async getrol() {
    let role = await Role.findByPk(this.roleId);
    return role.dataValues;
  }*/
}

module.exports = User;
