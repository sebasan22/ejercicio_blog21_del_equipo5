const { faker } = require("@faker-js/faker");
const { Article, User, Comment } = require("../models");
const bcrypt = require("bcryptjs");

faker.locale = "es";

/* const pass = async () => { bcrypt.hash("1234", 8) } */

module.exports = async () => {
  const users = [];
  const articles = [];
  const comments = [];
  for (let i = 0; i < 5; i++) {
    users.push({
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: await bcrypt.hash("1234", 8),
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

  //await User.bulkCreate(users);
  //await Article.bulkCreate(articles);
  //await Comment.bulkCreate(comments);

  /*   console.log("[Database] Se corrió el seeder de Articles."); */
};
