require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const formidableMiddleware = require("express-formidable");
const cors = require("cors");

const app = express();
app.use(formidableMiddleware());
app.use(cors());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

require("./models/models_projetImmo");

const roadsProjetImmo = require("./roads/roads_projetImmo");
app.use(roadsProjetImmo);

app.listen(process.env.PORT, () => {
  console.log("Server is listening");
});
