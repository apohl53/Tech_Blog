const User = require("./User");
const BlogPost = require("./BlogPost");
const Comment = require("./Comment");

User.hasMany(BlogPost, {
  foreignKey: "postId",
  onDelete: "CASCADE",
});

BlogPost.belongsTo(User, {
  foreignKey: "userId",
});

Comment.belongsTo(User, {
  foreignKey: "userId",
});

User.hasMany(Comment, {
  foreignKey: "commentId",
  onDelete: "CASCADE",
});

Comment.belongsTo(BlogPost, {
  foreignKey: "postId",
});

BlogPost.hasMany(Comment, {
  foreignKey: "postId",
});

Comment.belongsTo(User, {
  foreignKey: "userId",
});

User.hasMany(Comment, {
  foreignKey: "userId",
});

module.exports = {
  User,
  BlogPost,
  Comment,
};
