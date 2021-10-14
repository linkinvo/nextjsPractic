import { Action } from "redux";
import { IIdentity } from "src/common";

export const actionTypes = {
}

export function action(type: string, payload = {}): Action {
    return { type, ...payload };
}

export const SET_ALL_DATA_SCHEMA = 'SET_ALL_DATA_SCHEMA';
export const SET_IDENTITY_USER = 'SET_IDENTITY_USER';
export const GET_IDENTITY_USER = 'GET_IDENTITY_USER';

export const setAllDataAC = (entityName: string, response: any) => action(SET_ALL_DATA_SCHEMA, { entityName, response });
export const setIdentity = (response: any) => action(SET_IDENTITY_USER, { response });
// export const setIdentity = (response: any) => action(SET_IDENTITY_USER, { response });
export const getIdentity = (response: any)=> action(GET_IDENTITY_USER, response)// data: any


export const SET_USER_INFO = 'SET_USER_INFO';
export const LOGOUT = 'LOGOUT';
export const setUserInfo = (identity: IIdentity, token: string) => action(SET_USER_INFO, { identity, token });
const logout = () => action(LOGOUT);