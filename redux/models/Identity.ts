import { setUserInfo } from 'redux/store/actions';
import { call, put, select, take } from "redux-saga/effects";
import  action  from 'redux/decorators/action'
import validator from 'validator';
import { ENTITIES, HTTP_METHOD, IIdentity } from "src/common";
import Entity from "./Entity";
import Router from "next/router";



class Identity extends Entity {
  constructor() {
    super()
  }

  @action()
  public * sagaLogin(data) {
    console.log("DATA",data)
    if (validator.isEmail(data.email) && data.password !== '') {
        const result = yield call(this.xSave, '/users/login', data);
        if (result.success === true && result.response.error === false) {
            yield put(setUserInfo(result.response.identity.payload, result.response.identity.token))
            yield call(Router.push, '/');
        }
    }
}
  // public * sagaLogin(data) {
    // console.log("* loginUser-data",data)

    // yield call(this.xFetch, '/users/login', HTTP_METHOD.POST, data)
    // yield put(setIdentity(data));
    // const { payload } = yield call(this.xFetch, '/users/login', HTTP_METHOD.POST, data)
    // yield put(setIdentity(payload.data));
  // }

  @action()
  public * register(data) {
    yield call(this.xFetch, '/users/register', HTTP_METHOD.POST, data);
  }

}

const identity = new Identity();
export default identity;








// export const BTN_LOGIN_CLICK = 'BTN_LOGIN_CLICK'
// export const SET_USER_INFO = 'SET_USER_INFO'

// export function btnLoginClick(payload: any) {
//   return {
//     type: BTN_LOGIN_CLICK,
//     payload,
//   }
// }

// export const setUserInfo = (identity: IIdentity, token: string) => action(SET_USER_INFO, { identity, token })

// export function* login() {
//   while (true) {
//     let identity = yield select((state) => state.identity);
//     const data = yield take(BTN_LOGIN_CLICK);
//     if (identity.userToken === "") {
//       const result = yield call(this.xSave, "/users/login", data.payload);
//       if (result.success === true && result.response.error === false) {
//         yield put(
//           setUserInfo(
//             result.response.identity.payload,
//             result.response.identity.token
//           )
//         )
//         yield call(Router.push, "/");
//       }
//     }
//   }
// }

// export default function* sagas() {
//   yield all([
//     call(sagaLoginWatcher)
//   ])
// }



// // function identity(state, action) {
// //   switch (action.type) {
// //     case SET_USER_INFO: {
// //       return {
// //         ...state,
// //         ...action.identity,
// //         userToken: action.token,
// //       };
// //     }
// //     default:
// //       return state;
// //   }
// // }

// // export default identity;
