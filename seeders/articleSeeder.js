const { faker } = require("@faker-js/faker");
const { Article, User, Comment } = require("../models");

faker.locale = "es";

module.exports = async () => {
  const articles = [];
  const users = [];
  const comments = [];
  for (let i = 0; i < 15; i++) {
    let firstname = faker.name.firstName();
    let lastname = faker.name.lastName();
    let email = faker.internet.email(firstname, lastname);
    let password = faker.internet.password();
    users.push({ firstname, lastname, email, password });
  }
  for (let i = 0; i < 40; i++) {
    articles.push({
      title: faker.lorem.sentence(5),
      content: faker.lorem.paragraphs(5),
      img: faker.image.nature(480, 480, true),
      userId: Math.floor(Math.random() * 14) + 1,
    });
    comments.push({
      content: faker.lorem.paragraphs(2),
      userId: Math.floor(Math.random() * 14) + 1,
      articleId: Math.floor(Math.random() * 39) + 1,
    });
  }
  await User.bulkCreate(users);
  await Article.bulkCreate(articles);
  await Comment.bulkCreate(comments);

  console.log("[Database] Se corrió el seeder de Articles.");
};
