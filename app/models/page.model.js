module.exports = (sequelize, Sequelize) => {
  const Page = sequelize.define("page", {
    title: {
      type: Sequelize.STRING
    },
    image: {
      type: Sequelize.STRING
    }
  });

  return Page;
};

