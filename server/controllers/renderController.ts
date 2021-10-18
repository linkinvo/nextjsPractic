import { GET, route } from "awilix-express";
import { app } from "../index";
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
                // res.answer(data, 'Successful', httpStatus.OK)
                // console.log("DATA-RENDER", data)
                res.print('/index')
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
        console.log('object')
        const { PropertiesService } = this.di;
        PropertiesService.findOneByID(req.params.id)
        .then((data)=> {
            // res.answer(data, 'Successful /properties/[id].tsx ', httpStatus.OK)
            res.print('/properties/[id]', { id: req.params.id })
        })
        .catch((err) => {
            res.answer(null, err, httpStatus.BAD_REQUEST)
        })

        // return app.render(req, res, '/properties/[id]', { id: req.params.id })
    }

}