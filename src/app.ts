import * as express from "express";
import * as nunjucks from "nunjucks";
import * as path from "path";

import config from "./config";
import router from "./routers/routes";
// Connect to the database at the start of the application
require('./models/db');

const app = express();

// set some app variables from the environment
app.set("port", config.port);
app.set("dev", config.env === "development");

// needed to add body-parser middleware to parse the POST form fields into a JavaScript object - https://thewebdev.info/2021/07/04/how-to-fix-the-express-js-req-body-undefined-error/
const bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// where nunjucks templates should resolve to
const viewPath = path.join(__dirname, "views");

// set up the template engine
const env = nunjucks.configure([
  viewPath,
  "node_modules/govuk-frontend/",
  "node_modules/govuk-frontend/components",
], {
  autoescape: true,
  express: app,
});

app.set("views", viewPath);
app.set("view engine", "njk");

// serve static assets in development. this will not execute in production.
if (config.env === "development") {
  app.use("/static", express.static("dist/static"));
  env.addGlobal("CSS_URL", "/static/app.css");
}
// apply our default router to /
app.use("/", router);

export default app;
