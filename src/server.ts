import errorHandler from "errorhandler";

import app from "./app";
import expressHandlebars from "express-handlebars";
import Order from "./models/Order";

/**
 * Error Handler. Provides full stack - remove for production
 */
app.use(errorHandler());
app.engine("handlebars", expressHandlebars());
app.set("view engine", "handlebars");
app.get("/", async (req, res) => {
  const orders = await Order.findAllOrders(req.query.totalCharged);
  if(orders.length > 0) {
    for(const order of orders) {
      await order.getItems();
    }
  }
  res.render("index", {orders, totalCharged: req.query.totalCharged });
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
