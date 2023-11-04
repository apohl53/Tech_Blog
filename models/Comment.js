const { Model, DataTypes } = require("sequelize");
const db = require("../config/connection");

const dayjs = require("dayjs");

class Comment extends Model {}

Comment.init({
  id: {
    type: DataTypes.STRING,
  },
  text: {
    type: DataTypes.STRING,
    validate: {
      len: {
        args: 1,
        msg: "Your comment must contain characters in length.",
      },
    },
  },
});

module.exports = Comment;
