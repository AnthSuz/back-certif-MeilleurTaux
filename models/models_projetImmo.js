const mongoose = require("mongoose");

const ProjetImmo = mongoose.model("ProjetImmo", {
  ref: String,
  type: String,
  state: String,
  use: String,
  situation: String,
  country: String,
  city: String,
  amountProperty: Number,
  amountWorks: Number,
  notary: Number,
  total: Number,
  mail: String
});

module.exports = ProjetImmo;
