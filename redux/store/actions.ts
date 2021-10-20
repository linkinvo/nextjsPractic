import { Action } from "redux";
import { IIdentity } from "src/common";

export const actionTypes = {
}

export function action(type: string, payload = {}): Action {
    return { type, ...payload };
}

export const SET_ALL_DATA_SCHEMA = 'SET_ALL_DATA_SCHEMA';
export const SET_USER_INFO = 'SET_USER_INFO';
export const LOGOUT = 'LOGOUT';
export const GET_SSR_DATA_INFO = 'GET_SSR_DATA_INFO'

export const getSSRDataInfo = (payload: any) => action(GET_SSR_DATA_INFO, {payload});
export const setAllDataAC = (entityName: string, response: any) => action(SET_ALL_DATA_SCHEMA, { entityName, response });
export const setUserInfo = (identity: IIdentity, token?: string) => action(SET_USER_INFO, { identity, token });
export const logout = () => action(LOGOUT);
