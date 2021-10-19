
import BaseContext from "../baseContext";
import { route, GET, POST } from "awilix-express";
import { Request, Response, NextFunction } from 'express';
import httpStatus from "../../http-status";

@route("/api/properties")
export default class PropertiesController extends BaseContext {
  @route("/create")
  @POST()
  async create(req, res) { }

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
  save(req: Request, res: Response) {
    const { PropertiesService } = this.di;
    PropertiesService.save(req.body, req.params.id)
      .then(data => { res.answer(data, "properties are found successfully", httpStatus.OK) })
      .catch(err => { res.answer(null, err, httpStatus[500]) });
  }
}