import { ENTITIES } from './../../src/common';
import { GET, route } from "awilix-express";
import BaseContext from "../baseContext";
import { Request, Response, NextFunction } from 'express';
import httpStatus from "../../http-status";

@route('')
export default class RenderController extends BaseContext {

    @GET()
    @route('/')
    homePage(req: Request, res: Response) {
        const { PropertiesService } = this.di;
        const ssrData = {}
        PropertiesService.findAll()
            .then((data) => {
                // ssrData[ENTITIES.PROPERTIES] = data
                // res.print('/index', ssrData})
                res.print('/index', {[ENTITIES.PROPERTIES]: data})
            })
            .catch((err) => { res.print('/ERR404', err)})
    }

    @GET()
    @route('/properties/:id')
    propertyId(req: Request, res: Response) {
        const { PropertiesService } = this.di;
        const ssrData = {}
        PropertiesService.findOneByID(req.params.id)
        .then((data)=> {
            // ssrData[ENTITIES.PROPERTIES] = data
            res.print('/properties/[id]',{[ENTITIES.PROPERTIES]: data})
        })
        .catch((err) => { res.print('/ERR404', err)})
    }
}