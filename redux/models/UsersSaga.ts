import { call, take } from "redux-saga/effects"
import action from 'redux/decorators/action';
import { ENTITIES, IIdentity } from '../../src/common';
import Entity from './Entity';

class UserEntity extends Entity {
    constructor() {
        super(ENTITIES.USERS, {
        })
    }

    @action()
    public * sagaGetUsers() {
            yield call(this.xRead, '/user/' , {});
    }
}

const userEntity = new UserEntity();
export default userEntity;