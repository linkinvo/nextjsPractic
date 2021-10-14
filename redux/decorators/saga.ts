import { take, fork } from "redux-saga/effects";
import Entity from "redux/models/Entity";


const saga = (entity: Entity = null) => (constructor: Function = null) => {
    const entityName = entity.constructor.name;

    if (entityName in Entity.actions) {
        const methods = Entity.actions[entityName];
        Object.keys(methods).map(methodName => {
            const actionFunction = entity[methodName].bind(entity);
            const sagaFunction = function* () {
                while (true) {
                    const data = yield take(methodName);
                    yield fork(actionFunction, data)
                }
            }
            Entity.actions[entityName][methodName].saga = sagaFunction
        })
    }
}

export default saga;
