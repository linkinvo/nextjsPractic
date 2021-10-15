import { IIdentity } from './../../src/common';
import BaseContext from "../baseContext";
import passportLocal from 'passport-local';
import bcrypt from 'bcrypt';
import { IContextContainer } from "../container";
import jwt from 'jsonwebtoken';
import { Request } from 'express';
import config from '../../config';

export default class SignInStrategy extends BaseContext {
    private strategyUser: passportLocal.Strategy;

    get strategy() {
        return this.strategyUser;
    }

    constructor(opts: IContextContainer) {
        super(opts);
        this.verifyRequestUser = this.verifyRequestUser.bind(this);

        this.strategyUser = new passportLocal.Strategy({
            passwordField: 'password',
            usernameField: 'email',
            passReqToCallback: true,
            session: false,

        }, this.verifyRequestUser);
    }

    public async verifyRequestUser(req: Request, email: string, password: string, done: any) {

        const { UserModel } = this.di;

        let user = await UserModel.findOne({
            where: { email }
        });


        if (!user) {

            return done('Incorrect password');
        }
        if (!user.password) {

            return done('Your account is banned.Please contact support.')
        }

        const bcryptRes = await bcrypt.compare(password, user.password);
        if (!bcryptRes) {

            return done('Incorrect password');
        }

        const payload: IIdentity = {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
            email: user.email,
            phone: user.phone
        };

        const token = jwt.sign(payload, config.jwtSecret);
        
        user.userToken = token;
        user.save();
        // req.session.identity = payload;
        
        return done(null, {payload, token});
    }
}