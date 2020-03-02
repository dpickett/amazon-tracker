import Order from "../Order";

describe("Order", () => {
  it("finds an order based on total", async () => {
    const order = await Order.findAllOrders(14.86);
    expect(order).toBeTruthy();
  });

  it("has order items", async () => {
    const orders = await Order.findAllOrders(14.86);
    const order = orders[0];
    await order.getItems();
    expect(order.items[0]).toBeDefined();
  });
});
