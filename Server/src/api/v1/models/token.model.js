const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { connection } = require("../utils/connections_db");

const tokenSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
    token: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Token = connection.model("token", tokenSchema);
module.exports = Token;
