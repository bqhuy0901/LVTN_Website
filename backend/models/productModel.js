const mongoose = require("mongoose");
const { type } = require("os");
const { stringify } = require("querystring");

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
    },
    price: {
      type: Number,
      required: [true, "Plase Enter Product Price"],
      maxLength: [8, "Price cannot exceed 8 characters"],
    },
    brand: {
      type: String,
      required: [true, "Plase Enter Product brand"],
    },
    category: {
      type: String,
      required: [true, "Plase Enter Product Category"],
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

    // sizes: [
    //   {
    //     type: String,
    //     required: [true, "Plase Enter Product Size"],
    //   },
    // ],
    // colors: [
    //   {
    //     type: String,
    //     required: [true, "Plase Enter Product Color"],
    //   },
    // ],
    // weight: {
    //   type: Number,
    //   required: [true, "Plase Enter Product Weight"],
    // },

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
