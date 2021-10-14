import { Model, DataTypes, BuildOptions } from "sequelize";
import { IContextContainer } from "./../container";

interface IReviews extends Model {
  id: number;
  feedback: string;
  createdAt: BigInt;
  propertiId: number;
  userId: number;
}

export type ReviewsType = typeof Model & {
  new(values?: object, options?: BuildOptions): IReviews;
  initModel(): void;
};

export default (ctx: IContextContainer) => {
  const ReviewsModel = <ReviewsType>ctx.db.define("reviews", {
    id: { allowNull: false, autoIncrement: true, primaryKey: true, type: DataTypes.INTEGER },
    feedback: { type: DataTypes.TEXT, allowNull: false },
    userId: { type: DataTypes.INTEGER },
    propertiId: { type: DataTypes.INTEGER },
    createdAt: { allowNull: false, type: DataTypes.BIGINT },
    updatedAt: { type: DataTypes.BIGINT, allowNull: false },
  });

  ReviewsModel.initModel = () => {

    ReviewsModel.belongsTo(ctx.PropertiModel, {
      foreignKey: 'propertiId',
      onDelete: 'CASCADE',
    });

    ReviewsModel.belongsTo(ctx.UserModel, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
  }

  return ReviewsModel;
};