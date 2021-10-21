import { logout, setUserInfo } from 'redux/store/actions';
import { call, put, select, take } from "redux-saga/effects";
import action from 'redux/decorators/action'
import validator from 'validator';
import { ENTITIES, HTTP_METHOD, IIdentity } from "src/common";
import Entity from "./Entity";
import Router from "next/router";
import { ca } from 'date-fns/locale';

class Identity extends Entity {
  constructor() {
    super()
  }

  @action()
  public * sagaLogin(data) {
    if (validator.isEmail(data.email) && data.password !== '') {
      const result = yield call(this.xSave, '/users/login', data);
      if (result.success === true && result.response.error === false) {
        yield put(setUserInfo(result.response.data.identity.payload, result.response.data.identity.token))
        yield call(Router.push, '/');
      }
    }
  }

  @action()
  public * register(data) {
    yield call(this.xFetch, '/users/register', HTTP_METHOD.POST, data);
    yield call(Router.push, '/')
    
  }

  @action()
  public * logout() {
    document.cookie = 'token=; Path=/;'
  }
}

const identity = new Identity();
export default identity;