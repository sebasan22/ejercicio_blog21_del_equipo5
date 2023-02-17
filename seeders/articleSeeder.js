const { faker } = require("@faker-js/faker");
const { Article, User, Comment, Role } = require("../models");
const bcrypt = require("bcryptjs");

faker.locale = "es";

/* const pass = async () => { bcrypt.hash("1234", 8) } */

module.exports = async () => {
  const articles = [];
  const comments = [];

  const accessName = ["lector", "escritor", "editor", "administrador"];
  const roleCode = [100, 200, 300, 400];
  const roles = [];
  const users = [
    {
      username: "lector",
      email: "lector@hotmail.com",
      password: await bcrypt.hash("1234", 8),
      roleName: accessName[0],
      roleCode: roleCode[0],
    },
    {
      username: "escritor",
      email: "escritor@hotmail.com",
      password: await bcrypt.hash("1234", 8),
      roleName: accessName[1],
      roleCode: roleCode[1],
    },

    {
      username: "editor",
      email: "editor@hotmail.com",
      password: await bcrypt.hash("1234", 8),
      roleName: accessName[2],
      roleCode: roleCode[2],
    },
    {
      username: "admin",
      email: "admin@hotmail.com",
      password: await bcrypt.hash("1234", 8),
      roleName: accessName[3],
      roleCode: roleCode[3],
    },
  ];

  for (let i = 0; i < 20; i++) {
    const randomNumber = faker.datatype.number({ min: 0, max: 2 });

    users.push({
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: await bcrypt.hash("1234", 8),
      roleName: accessName[randomNumber],
      roleCode: roleCode[randomNumber],
    });
    articles.push({
      title: faker.lorem.sentence(5),
      content: faker.lorem.paragraphs(5),
      img: faker.image.nature(480, 480, true),

      userId: Math.floor(Math.random() * (4 - 1)) + 2,
    });

    comments.push({
      content: faker.lorem.paragraphs(2),
      userId: Math.floor(Math.random() * 4) + 1,
      articleId: Math.floor(Math.random() * 4) + 1,
    });
  }
  //await Role.bulkCreate(roles);
  await User.bulkCreate(users);
  await Article.bulkCreate(articles);
  await Comment.bulkCreate(comments);

  /*   console.log("[Database] Se corrió el seeder de Articles."); */
};
