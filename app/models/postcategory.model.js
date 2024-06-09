
module.exports = (sequelize, Sequelize) => {
  const PostCategory = sequelize.define("postcategory", {
    title: {
      type: Sequelize.STRING
    },
    image: {
      type: Sequelize.STRING
    },
    page_id:{
      type:Sequelize.INTEGER,
    }
  });

  return PostCategory;
};
