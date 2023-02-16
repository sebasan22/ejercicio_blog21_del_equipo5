const { faker } = require("@faker-js/faker");
const { Article, User, Comment, Role } = require("../models");
const bcrypt = require("bcryptjs");

faker.locale = "es";

/* const pass = async () => { bcrypt.hash("1234", 8) } */

module.exports = async () => {
  const users = [
    {
      username: "admin",
      email: "admin@hotmail.com",
      password: await bcrypt.hash("1234", 8),
      roleId: 4,
    },
    {
      username: "editor",
      email: "editor@hotmail.com",
      password: await bcrypt.hash("1234", 8),
      roleId: 3,
    },
    {
      username: "escritor",
      email: "escritor@hotmail.com",
      password: await bcrypt.hash("1234", 8),
      roleId: 2,
    },
    {
      username: "lector",
      email: "lector@hotmail.com",
      password: await bcrypt.hash("1234", 8),
      roleId: 1,
    },
  ];

  const articles = [];
  const comments = [];

  const accessName = ["lector", "escritor", "editor", "administrador"];
  const roles = [];

  for (let i = 0; i < 4; i++) {
    roles.push({ accesslevel: accessName[i] });
  }

  for (let i = 0; i < 10; i++) {
    users.push({
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: await bcrypt.hash("1234", 8),
      roleId: 1,
    });
    articles.push({
      title: faker.lorem.sentence(5),
      content: faker.lorem.paragraphs(5),
      img: faker.image.nature(480, 480, true),
      userId: Math.floor(Math.random() * 4) + 1,
    });
    comments.push({
      content: faker.lorem.paragraphs(2),
      userId: Math.floor(Math.random() * 4) + 1,
      articleId: Math.floor(Math.random() * 4) + 1,
    });
  }
  await Role.bulkCreate(roles);
  await User.bulkCreate(users);
  await Article.bulkCreate(articles);
  await Comment.bulkCreate(comments);

  /*   console.log("[Database] Se corrió el seeder de Articles."); */
};
