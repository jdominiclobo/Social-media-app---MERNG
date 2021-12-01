const { model, Schema } = require("mongoose");

const postSchema = new Schema({
  body: String, // We can define it (as a mongo schema(mongo is schemaless in real)) as String here and also let Graphql define it
  username: String,
  createdAt: String,
  comments: [
    {
      body: String,
      username: String,
      createdAt: String,
    },
  ],
  likes: [
    {
      username: String,
      createdAt: String,
    },
  ],
  user: {
    type: Schema.Types.ObjectId,
    ref: "users", // Though mongo is non-relational or schemaless, the ORM lets us have a relation with the data models
  },
});

module.exports = model("Post", postSchema);
