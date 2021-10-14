import BaseContext from '../baseContext';

export default class UserService extends BaseContext {
    public findAll() {
        const { UserModel } = this.di;
        return UserModel.findAll({});
        
    }

    public async save(body, id) {
        const { UserModel } = this.di;
        let user = await UserModel.findByPk(id);
        if (isNaN(id)) return Promise.reject('Parameter is not a number!');
        if (user) {
            user.set(body);
        } else {
            user =  UserModel.build(body);
        }
        return user.save();
    }

    public findOneByID(id) {
        const { UserModel } = this.di;
        if (isNaN(id)) return Promise.reject('Parameter is not a number!');
        return UserModel.findByPk(id)
    }


    public getUserByToken(token: string) {
        const { UserModel } = this.di;
        if (token.trim() === "") return Promise.reject('Wrong token');
        return UserModel.findOne(
            {
                attributes: [
                    'firstName', 'lastName'
                ],
                where: { userToken : token }
            })
    };
    
    // public deleteByID(id) {
    //     const { UserModel } = this.di;
    //     return UserModel.findByIdAndDelete(id);
    // }
}