import { Model, DataTypes, BuildOptions, IntegerDataType } from "sequelize";
import { IContextContainer } from "./../container";

interface IProperties extends Model {
  id: number;
  img: string;
  description: string;
  rating: number;
  price: number;
  beds: number;
  baths: number;
  userId: number;
  createdAt: number;
  updatedAt: number;
}


//Math.floor(new Date().getTime()/1000.0)

export type PropertiesType = typeof Model & {
  new (values?: object, options?: BuildOptions): IProperties;
  initModel(): void;
};

export default (ctx: IContextContainer) => {
  
  const PropertiModel = <PropertiesType>ctx.db.define("properties", {
    id: {allowNull: false, autoIncrement: true, primaryKey: true, type: DataTypes.INTEGER,},
    img: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: false },
    rating: { type: DataTypes.INTEGER, defaultValue: 0 },
    price: { type: DataTypes.INTEGER, allowNull: false },
    beds: { type: DataTypes.INTEGER, allowNull: false },
    baths: { type: DataTypes.INTEGER, allowNull: false },
    userId: { type: DataTypes.INTEGER },
    createdAt: { type: DataTypes.INTEGER },
    updatedAt: { type: DataTypes.INTEGER },
  },
  {
    timestamps: false,
  });

  PropertiModel.initModel = () => {

    PropertiModel.belongsTo(ctx.UserModel);
    
    PropertiModel.hasMany(ctx.ReviewsModel, {
      sourceKey: 'id',
      foreignKey: 'propertiId',
      onDelete: 'CASCADE',
    });
  }

  return PropertiModel;
};
