const mysql2 = require("mysql2");
import * as awilix from 'awilix';
import {Sequelize} from 'sequelize';
import config from "../config";

import services, {IServicesContainer} from './services'
import passport, { PassportStatic } from 'passport';
import modelContainer, { IModelContainer } from './models/index';
import SignUpStrategy from './passports/SingUpStrategy';
import SignInStrategy from './passports/SignInStrategy';
import JwtStrategy from './passports/JwtStrategy';


export interface IContextContainer extends IModelContainer, IServicesContainer {
  config: any;
  db: Sequelize;
  passport: PassportStatic;
  SignUpStrategy: SignUpStrategy;
  SignInStrategy: SignInStrategy;
  JwtStrategy: JwtStrategy;
}

const container = awilix.createContainer<IContextContainer>({
  injectionMode: awilix.InjectionMode.PROXY,
});

export const passportFC = (ctx: IContextContainer) => {
  passport.use('local-login', ctx.SignInStrategy.strategy);
  passport.use('local-signup', ctx.SignUpStrategy.strategy);
  passport.use('local-jwt', ctx.JwtStrategy.strategy)

  return passport;
}

const createDB = (ctx: IContextContainer) => {
  return new Sequelize(
      ctx.config.db.database,
      ctx.config.db.username,
      ctx.config.db.password,
      {
          dialect: ctx.config.db.dialect,
          dialectModule: mysql2,
      },
  );
}

container.register({
  ...modelContainer,
  ...services,
  config: awilix.asValue(config),
  db: awilix.asFunction(createDB).singleton(),
  passport: awilix.asFunction(passportFC).singleton(),
  SignUpStrategy: awilix.asClass(SignUpStrategy).singleton(),
  SignInStrategy: awilix.asClass(SignInStrategy).singleton(),
  JwtStrategy: awilix.asClass(JwtStrategy).singleton(),
});




// container.loadModules(['models/**/*.ts'], {
//     resolverOptions: {
//       injectionMode: awilix.InjectionMode.PROXY,
//       register: awilix.asFunction,
//       lifetime: awilix.Lifetime.SINGLETON
//     },
//     cwd: __dirname,
//     //formatName: 'camelCase',
//   }, 
//   )


export default container;