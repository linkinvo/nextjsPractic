
import BaseContext from "../baseContext";
import { route, GET, POST } from "awilix-express";
import { Request, Response, NextFunction } from 'express';
import httpStatus from "../../http-status";

@route("/api/properties")
export default class PropertiesController extends BaseContext {

  @route('/')
  @GET()
  getAllProperti(req: Request, res: Response) {
    const { PropertiesService } = this.di;
    PropertiesService.findAll()
      .then((data) => { res.answer(data, 'properties are found successfully', httpStatus.OK) })
      .catch((err) => { res.answer(null, err, "properties can't be found", httpStatus[500]) });
  }

  @route('/:id')
  @GET()
  getById(req: Request, res: Response) {
    const { PropertiesService } = this.di;
    PropertiesService.findOneByID(req.params.id)
      .then(data => { res.answer(data, "properties are found successfully", httpStatus.OK) })
      .catch(err => { res.answer(null, err, "properties can't be found", httpStatus[500]) });
  }

  @route('/save/:id')
  @POST()
  saveProperti(req: Request, res: Response) {
    const { PropertiesService } = this.di;
    
    const result = PropertiesService.save(req.body, req.params.id)
      .then(data => { res.answer(data, 'properties are found successfully', httpStatus.OK) })
      .catch(err => { res.answer(null, err, httpStatus[500]) })
      
      console.log("TAIME", 	Math.floor(new Date().getTime()/1000.0))
      console.log("RESULT_CONTORLL", result)
      return result
  }
}