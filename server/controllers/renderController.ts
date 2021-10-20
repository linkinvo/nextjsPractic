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
        PropertiesService.findAll()
            .then((data) => {
                // console.log("DATA-CONTROLL('/')", data)
                res.print('/index', {}, data)
            })
            .catch((err) => {
                res.answer(null, err, httpStatus.BAD_REQUEST)
            })
            
        // return res.print('/index')

        // return app.render(req, res, '/index')
    }

    @GET()
    @route('/properties/:id')
    propertyId(req: Request, res: Response) {
        const { PropertiesService } = this.di;
        PropertiesService.findOneByID(req.params.id)
        .then((data)=> {
            // console.log("DATA-CONTROLL(/properties/[id])", data)
            res.print('/properties/[id]', { id: req.params.id }, data)
        })
        .catch((err) => {
            res.answer(null, err, httpStatus.BAD_REQUEST)
        })

        // return app.render(req, res, '/properties/[id]', { id: req.params.id })
    }

}