import { applyMiddleware, combineReducers, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { createWrapper, HYDRATE } from 'next-redux-wrapper'
import { fromJS, Map } from 'immutable';
import {rootWatcher} from '../saga/index'
import { serialize, deserialize } from 'json-immutable';
import { GET_IDENTITY_USER, SET_ALL_DATA_SCHEMA, SET_IDENTITY_USER } from 'redux/store/actions';
import { IIdentity } from 'src/common';

const bindMiddleware = (middleware) => {
    if (process.env.NODE_ENV !== 'production') {
        const { composeWithDevTools } = require('redux-devtools-extension')
        return composeWithDevTools(applyMiddleware(...middleware))
    }
    return applyMiddleware(...middleware)
}

export interface AppState {
    entities: Map<string, Map<string, any>>,
}

const initialEntities = fromJS({});  

function entities(state = initialEntities, action: any) {
    switch (action.type) {    
        case SET_ALL_DATA_SCHEMA:
            if (action.response && action.response.entities) {
                const { response: { entities } } = action;
                if (entities) {
                    Object.keys(entities).map((entityName) => {
                        let list = state.get(entityName);
                        if (list && list.size > 0) {
                            Object.keys(entities[entityName]).map((id) => list = list.remove(id));
                        }
                        state = state.set(entityName, list);
                    });
                    state = state.mergeDeep(fromJS(entities));
                }
            }
            break;
    }
    return state;

}

const initialState: IIdentity = {
    id: 365,
    email: "user7.man@gmail.ru",
    role: "ADMIN",
    phone: "+380681353543",
    firstName: "User7",
    lastName: "User7",
    userToken: ""
    // userToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzY1LCJmaXJzdE5hbWUiOiJVc2VyNyIsImxhc3ROYW1lIjoiVXNlcjciLCJyb2xlIjoiQURNSU4iLCJlbWFpbCI6InVzZXI3Lm1hbkBnbWFpbC5ydSIsInBob25lIjoiKzM4MDY4MTM1MzU0MyIsImlhdCI6MTYzNDEzNjE1M30.fF3kFlXB1a6ScJExnlPvD8kQuP6qeA9cFonDWUAiFM0",
  };

const identity = (state = initialState, action: any) => {
    
    switch (action) {
        case SET_IDENTITY_USER: {
            if (action) {
                return { 
                    ...state, 
                    ...action,
                };
            }
        }
                // case GET_IDENTITY_USER: {
        //     console.log("GET_IDENTITY_USER",GET_IDENTITY_USER)
        //     if(action.payload) {
        //         return {
        //             ...state, 
        //             ...action.identity,
        //             userToken: action.token,
        //             payload: {...action.payload }
        //          };
        //     }
        //     return {...state}
        // }
        // default: {
        //     return state;
        // }
    }
    return state
}

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

const appReducer = combineReducers({
    identity,
    entities,
})

let isHydrated = false;

function nextReducer(state: AppState, action) {
    
    if (action.type.includes('@@redux/INIT')) {
        isHydrated = false;
    }
    switch (action.type) {
        case HYDRATE: {
            if (action.payload.entities.size <= 0) {
                return { ...state };
            }
            return { ...state, ...action.payload };
        }
        default:
            return state
    }
}

function rootReducer(state, action) {
    const intermediateState = appReducer(state, action);
    const finalState = nextReducer(intermediateState, action);
    return finalState;
}




export const makeStore = (ctx) => {
    const sagaMiddleware = createSagaMiddleware()

    const store: any = createStore(rootReducer, bindMiddleware([sagaMiddleware]))

    store.sagaTask = sagaMiddleware.run(rootWatcher)

    store.runSaga = () => sagaMiddleware.run(rootWatcher)

    return store
}


// export const wrapper = createWrapper(makeStore)
 const wrapper = createWrapper(makeStore,  { 
    serializeState: state => {
        return state === Object(state) ? serialize(state) : state;
    },
    deserializeState: state => {
        return state === Object(state) ? state : deserialize(state);
    }
});

export default wrapper; 