
module.exports = (sequelize, Sequelize) => {
  const Post = sequelize.define("post", {
    title: {
      type: Sequelize.STRING
    },
    image: {
      type: Sequelize.STRING
    },
    postcategory_id:{
      type:Sequelize.INTEGER,
    }
  });

  return Post;
};
