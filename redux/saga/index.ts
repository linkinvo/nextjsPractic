// import  propertyEntity from 'redux/models/PropertiesSaga'
import 'redux/models/PropertyEntity'
import 'redux/models/ReviewsSaga'
import 'redux/models/UsersSaga'
import 'redux/models/Identity'
import { all, call} from "redux-saga/effects"
import Entity from "redux/models/Entity";

export const rootWatcher = function* root() {
  const sagaAll = Entity.getActions();
  yield all(Object.values(sagaAll).map(
    entity => all(Object.values(entity).map((saga: any) => saga.saga ? call(saga.saga) : ''))
    ));
}