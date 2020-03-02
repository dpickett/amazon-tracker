import csv from "csvtojson";
import path from "path";
import fastGlob from "fast-glob";

import OrderItem from "./OrderItem";

const csvGlob = path.join(__dirname, "../../data/orders/*.csv");
export default class Order {
  constructor(json: any) {
    this.json = json;
  }

  public json!: any
  public items: OrderItem[]

  get orderId(): string {
    return this.json["Order ID"];
  }

  async getItems() {
    if(!this.items) {
      this.items = await OrderItem.findAllByOrderId(this.orderId);
    }
    return this.items;
  }

  static async findAllOrders(total: number, date: Date = null): Promise<Order[]> {
    return new Promise(async (resolve) => {
      const orders = [];
      for(const filePath of fastGlob.sync(csvGlob)) {
        const csvArray = await csv().fromFile(filePath);
        for(const json of csvArray) {
          if(json["Total Charged"] === `\$${total}`) {
            orders.push(new Order(json));
          }
        }
      }
      resolve(orders);
    });
  }
}
