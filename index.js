const express = require("express");
const mongoose = require("mongoose");
const posts = require("./routes/posts");
const app = express();

mongoose
  .connect("mongodb://localhost/blog-demo", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

app.use(express.json());
app.use("/api/posts", posts);

const port = process.env.PORT || 5000;
app.listen(port, () =>
  console.log(`All good! Server is starting on port ${port}...`)
);
