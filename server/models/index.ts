import * as awilix from 'awilix';
import UserModel, { UserType } from './userModel';
import PropertiModel, {PropertiesType} from './propertiesModel'
import ReviewsModel , {ReviewsType} from './reviewsModel'
import { IContextContainer } from '../container';

export interface IModelContainer {
  initModels: () => void;
  UserModel: UserType;
  PropertiModel: PropertiesType;
  ReviewsModel: ReviewsType;
}

const initModels = (ctx: IContextContainer)  => {
  const { ReviewsModel, UserModel, PropertiModel } = ctx;
  return () => {
    UserModel.initModel(),
    PropertiModel.initModel(),
    ReviewsModel.initModel()
  }
}

export default {
  initModels: awilix.asFunction(initModels).singleton(),
  UserModel: awilix.asFunction(UserModel).singleton(),
  PropertiModel: awilix.asFunction(PropertiModel).singleton(),
  ReviewsModel: awilix.asFunction(ReviewsModel).singleton(),
}