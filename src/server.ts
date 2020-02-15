import errorHandler from "errorhandler";

import app from "./app";
import expressHandlebars from "express-handlebars";

/**
 * Error Handler. Provides full stack - remove for production
 */
app.use(errorHandler());
app.engine("handlebars", expressHandlebars());
app.set("view engine", "handlebars");
app.get("/", (req, res) => {

});

/**
 * Start Express server.
 */
const server = app.listen(app.get("port"), () => {
  console.log(
    "  App is running at http://localhost:%d in %s mode",
    app.get("port"),
    app.get("env")
  );
  console.log("  Press CTRL-C to stop\n");
});

export default server;
