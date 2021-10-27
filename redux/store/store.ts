import { applyMiddleware, combineReducers, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { createWrapper, HYDRATE } from 'next-redux-wrapper'
import { fromJS, Map } from 'immutable';
import {rootWatcher} from '../saga/index'
import { serialize, deserialize } from 'json-immutable';
import { GET_SSR_DATA_INFO, LOGOUT, SET_ALL_DATA_SCHEMA, SET_USER_INFO } from 'redux/store/actions';
import { IIdentity } from 'src/common';
import { reducer as reduxFormReducer } from 'redux-form'

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

 export const entities = (state = initialEntities, action: any)=> {
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
    id: '',
    email: "",
    role: "",
    phone: "",
    firstName: "",
    lastName: "",
    token: ""
  };


const identity = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_INFO: {
            return {
                ...state,
                ...action.identity,
                userToken: action.token
            }
        }
        case LOGOUT: {
            return {
                ...initialState
            }
        }

        default:
            return state
    }
}

const ssrDataInitialState: any = {};
const ssrDataReducer = (state = ssrDataInitialState, action: any) => {
    switch (action.type) {
        case GET_SSR_DATA_INFO: {
            return { ...action.payload }
        }
        default:
            return state;
    }
}

const appReducer = combineReducers({
    ssrDataReducer,
    identity,
    entities,
    form: reduxFormReducer,
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

    store.sagaMiddleware = () => sagaMiddleware.run(rootWatcher)

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