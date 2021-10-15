import { call, put, select, take } from 'redux-saga/effects';
import { normalize, schema } from "normalizr";
import { HTTP_METHOD } from "src/common";
import { action, setAllDataAC } from 'redux/store/actions';
import next from '../../next.config';
import { camelizeKeys } from 'humps';
import saga from 'redux/decorators/saga';

export default class Entity {
  private schema; 
  private entityName:string;
  public static actions: any = [];
  private className;

  constructor(name: string= null,definition: any = {}, options: any = {}) {
    if (name !== null) this.schema = new schema.Entity(name, definition, options);
    this.entityName = name;
    this.className = this.constructor.name;
    this.xFetch = this.xFetch.bind(this);
    this.actionRequest = this.actionRequest.bind(this);
    this.xRead = this.xRead.bind(this);
    this.xSave = this.xSave.bind(this);
    
    Entity.addAction = Entity.addAction.bind(this);
    Entity.getActions = Entity.getActions.bind(this);
  }

  public getSchema() {
    return this.schema;
  }
  public getEntityName() {
    return this.entityName;
  }

  public static addAction(saga) {
    Entity.actions.push(saga);
  }

  public static getActions(actionName: string = null) {
    return Entity.actions;
  }

  public getListAction(action) {
    return Entity.getActions()[this.className][action].decoratorFunction;
  }

  protected xFetch(endpoint: string, method: HTTP_METHOD, data = {}, token?: string){
    let fullUrl = next.baseUrl + '/api' + endpoint; 

    const params: any = {
      method,
      credentials: 'include',
      headers: {
        Authorization: 'bearer ' + token, // get token from cookies
      },
    };
    console.log("PARAMS", params)

    if (method !== HTTP_METHOD.GET) {
      params['headers']['content-type'] = 'application/json';
      params['body'] = JSON.stringify(data);

    } else {
      const opts = Object.entries(data).map(([key, val]) => key + '=' + val).join('&');
      fullUrl += (opts.length > 0 ? '?' + opts : '');
    }

    return fetch(fullUrl, params)
      .then((response) => {
        return response.json().then((json) => ({ json, response }));
      })
      .then(({ json, response }) =>
        Promise.resolve({
          success: response.ok ? true : false,
          response: json
        })
      );
  }

  public * actionRequest(endpoint?: string, method?: HTTP_METHOD, data?: any, token?: string ) {
    // const token = yield select((state: any) => state?.identity?.userToken)
    
    const result = yield call(this.xFetch, endpoint, method, data, token )

    const schema = (Array.isArray(result.response.data)? [this.getSchema()] : this.getSchema())
    if (result.success === true && result.response.error === false && this.schema) {
      const normalizedData = normalize(camelizeKeys(result.response.data), schema); 
      return yield put(setAllDataAC(this.getEntityName(), normalizedData))
    }
    return result;
  }

  public xSave(point: string, data: any = {}){
    return this.actionRequest(point, HTTP_METHOD.POST, data);
  }

  public xRead(point: string, data: any = {}, method: HTTP_METHOD = HTTP_METHOD.GET){
    return this.actionRequest(point, method, data);
  }

  public xDelete(point: string, data: any = {}){
    return this.actionRequest(point, HTTP_METHOD.DELETE, data);
  }
}