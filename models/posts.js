const mongoose = require("mongoose");
const Joi = require("@hapi/joi");

const schema = Joi.object({
  title: Joi.string().required().min(4).max(40),
  story: Joi.string().required().min(20).max(2000),
  date: Joi.date(),
});

const post = mongoose.Schema({
  name: { type: String, required: true, minlength: 4, maxlength: 40 },
  story: { type: String, required: true, minlength: 20, maxlength: 2000 },
  date: { type: Date, default: Date.now, required: true },
});

const Post = mongoose.model("Post", post);

module.exports = { Post, schema };
