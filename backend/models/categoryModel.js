const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Plase Enter Category Name"],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      require: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", categorySchema);
