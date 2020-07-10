const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Joi = require("@hapi/joi");
const { Post, schema } = require("../models/posts");

router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().sort("date");
  } catch (error) {
    res.status(400);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.send(post);
  } catch (error) {
    res.status(404).send("There's no posts with the given ID");
  }
});

router.post("/", async (req, res) => {
  const { error } = Joi.validate(req.body, schema);
  if (error) res.statusCode(400).send(error.details[0].message);

  const post = new Post({
    title: req.body.title,
    story: req.body.story,
    date: req.body.date,
  });

  try {
    const result = await post.save();
  } catch (error) {
    for (field in error) res.send(error.errros[field].message);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
  } catch (error) {
    res.status(404).send("There's no posts with the given ID");
  }
});

module.exports = router;
