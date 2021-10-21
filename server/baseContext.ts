import { IIdentity } from "src/common";
import { IContextContainer } from "./container";

declare global {
    namespace Express {
        interface Response {
            answer: (data: any, message?: any, status?: number) => void;
            print: (pathName: string,ssrData: any) => void;
        }
        interface Request {
            identity: IIdentity,
            ssrData: any
        }

    }
}


export default class BaseContext {
    protected di: IContextContainer;
    private static stopInit: boolean = false;

    constructor(opts: IContextContainer) {
        this.di = opts

        if (!BaseContext.stopInit) {
            console.log('initModels', this.constructor.name);
            opts.initModels();
            BaseContext.stopInit = true;
        }

    }
}