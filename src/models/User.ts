import { Model } from "sequelize";

export class User extends Model {
  public id!: number;
  public firstName!: string
  public lastName!: string
  public uid!: string
  public accessToken!: string
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}
