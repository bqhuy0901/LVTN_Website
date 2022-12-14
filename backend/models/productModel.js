const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Plase Enter Product Name"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Plase Enter Product Description"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Plase Enter Product Price"],
      maxLength: [11, "Price cannot exceed 8 characters"],
    },
    brand: {
      type: String,
    },
    category: {
      type: String,
      required: [true, "Plase Enter Product Category"],
    },
    size: {
      type: Number,
      required: [true, "Plase Enter Product Size"],
    },
    ratings: {
      type: Number,
      default: 0,
    },
    images: [
      {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    ],
    Stock: {
      type: String,
      required: [true, "Plase Enter Product Stock"],
      maxLength: [4, "Price cannot exceed 4 characters"],
      default: 1,
    },
    numOfReviews: {
      type: Number,
      default: 0,
    },
    reviews: [
      {
        user: {
          type: mongoose.Schema.ObjectId,
          ref: "User",
          require: true,
        },
        name: {
          type: String,
          required: true,
        },
        rating: {
          type: Number,
          required: true,
        },
        comment: {
          type: String,
          required: true,
        },
      },
    ],
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      require: true,
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
