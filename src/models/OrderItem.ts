import path from "path";
import fastGlob from "fast-glob";
import csv from "csvtojson";

const csvGlob = path.join(__dirname, "../../data/items/*.csv");
export default class OrderItem {
  constructor(json: object) {
    this.json = json;
  }
  public json!: any

  get title(): string {
    return this.json["Title"];
  }

  get shipmentDate(): string {
    return this.json["Shipment Date"];
  }
  static async findAllByOrderId(orderId: string): Promise<OrderItem[]> {
    return new Promise(async (resolve) => {
      const orderItems = [];
      for(const filePath of fastGlob.sync(csvGlob)) {
        const csvArray = await csv().fromFile(filePath);
        for(const json of csvArray) {
          if(json["Order ID"] === orderId) {
            orderItems.push(new OrderItem(json));
          }
        }
      }
      resolve(orderItems);
    });
  }
}
