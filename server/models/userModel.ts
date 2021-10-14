
import bcrypt from "bcrypt";
import { Model, DataTypes, BuildOptions } from 'sequelize';
// import { createGunzip } from 'zlib';

import { IContextContainer } from '../container';


interface IUser extends Model {
  userToken?: string;
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone: string;
    role: string;
    createdAt: number;
    updatedAt: number;
}

export type UserType = typeof Model & {
    new (values?: object, options?: BuildOptions): IUser;
    initModel(): void;
}

export default (ctx: IContextContainer) => {
  const UserModel = <UserType>ctx.db.define("users", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [4, 255],
          msg: "First Name must be between 6 and 255 characters in length",
        },
      },
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [4, 255],
          msg: "Last Name must be between 6 and 255 characters in length",
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: {
          args: [4, 255],
          msg: "Email address must be between 6 and 255 characters in length",
        },
        isEmail: {
          msg: "Email address must be valid",
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [6, 255],
          msg: "Password must be between 6 and 255 characters in length",
        },
      },
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: "CLIENT",
    },
    userToken: {
      type: DataTypes.STRING(300),
      allowNull: true,
      unique: true,
    },
    createdAt: {
      allowNull: true,
      type: DataTypes.BIGINT,
    },
    updatedAt: {
      allowNull: true,
      type: DataTypes.BIGINT,
    },    
  },{
    timestamps: false,
  });

  UserModel.beforeSave(async User => {
      try {
          if (User.changed('password')) {
              const salt = await bcrypt.genSalt(10);
              const hash = await bcrypt.hash(User.password, salt);
              User.password = hash;

            }
            User.updatedAt = Date.now() / 1000;
            if (User.isNewRecord) {
              User.createdAt = Date.now() / 1000;
            }
      } catch (err) {
          console.log(err);
      }
  });

  UserModel.initModel = () => {

    UserModel.hasMany(ctx.PropertiModel, {
      sourceKey: "id",
      foreignKey: "userId",
      onDelete: "CASCADE",
      as: "properties",
    });

    UserModel.hasMany(ctx.ReviewsModel, {
      sourceKey: "id",
      foreignKey: "userId",
      onDelete: "CASCADE",
      as: "reviews",
    });
  };

  return UserModel;
};