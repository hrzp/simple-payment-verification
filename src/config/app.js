var path = require("path");
var logger = require("morgan");
const cors = require("cors");

const corsOptions = {
    origin: "*", // Or pass origins you want
    credentials: true
};

module.exports = (app, express) => {
  app.use(logger("dev"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(express.static(path.join(__dirname, "public")));
  app.use(cors(corsOptions));
};
