import { Request } from 'express';
import passportLocal from 'passport-local';
import { IContextContainer } from '../container';
import BaseContext from '../baseContext';


export default class SignUpStrategy extends BaseContext {
    private strategyUser: passportLocal.Strategy;

    get strategy() {
        return this.strategyUser;
    }

    constructor(opts: IContextContainer) {
        super(opts)

        this.verifyRequestUser = this.verifyRequestUser.bind(this);


        this.strategyUser = new passportLocal.Strategy({
            passwordField: 'password',
            passReqToCallback: true,
            usernameField: 'email',
            session: false,
        }, this.verifyRequestUser);
    }

    public async verifyRequestUser(req: Request, email: string, password: string, done: any) {
        const { UserModel } = this.di;
        let user = await UserModel.findOne({
            where : { email }
        });
        if (user) {
            return done({ email: 'That e-mail already taken!' });
        }

        const { firstName, lastName, phone, role } = req.body;
        
        const userData = {
            firstName: firstName && firstName.trim(),
            lastName: lastName && lastName.trim(),
            email: email && email.trim().toLowerCase(),
            password: password && password.trim(),
            phone: phone && phone.trim(), 
            role: role,
        }

        user = await UserModel.create(userData);
        console.log('CREATEuserJSON', user.toJSON());
        return done(null, {
            id: user.id
        });
    }
}