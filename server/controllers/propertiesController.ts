
import BaseContext from "../baseContext";
import { route, GET, POST } from "awilix-express";
import { Request, Response, NextFunction } from 'express';
import statusCode from '../../http-status'

@route("/api/properties")
export default class PropertiesController extends BaseContext {
  @route("/create")
  @POST()
  async create(req, res) {
    // res.send(await this.propertiesService.get(req.params.id));
  }

  @route('/')
  @GET()
  getAllProperti(req: Request, res: Response) {
    const { PropertiesService } = this.di;
    // const result = PropertiesService.findAll()
    // console.log('RESULT',result)
    PropertiesService.findAll()
    .then((data) => {
      // const props = {
      //     data: data,
      //     message: "properties are found successfully",
      //     error: false
      // }
      // res.send(props);
      res.answer(data, 'properties are found successfully', statusCode.OK)
  })
  .catch((err) => {
      // const props = {
      //     data: null,
      //     message: err,
      //     error: true
      // }
      // res.status(500).send(props);
      res.answer(null, err, "properties can't be found", 500);
  });
    // return result
  }



  @route('/:id')
  @GET()
  getById(req: Request, res: Response) {
    const { PropertiesService } = this.di;
        
    PropertiesService.findOneByID(req.params.id)
    .then(data => {
        // const props = {
        //     data: data,
        //     message: "properties are found successfully",
        //     error: false
        // }
        // res.send(props);
        res.answer(data, "properties are found successfully", statusCode.OK)
    })
    .catch(err => {
        // const props = {
        //     data: null,
        //     message: err,
        //     error: true
        // }
        // res.status(500).send(props);
        res.answer(null, err, "properties can't be found", statusCode[500])
    });

}


@route('/save/:id')
@POST()
save(req: Request, res: Response) {
  const { PropertiesService } = this.di;

  const result = PropertiesService.save(req.body, req.params.id)
  .then(data => {
    const props = {
        data: data,
        message: "properties are found successfully",
        error: false
    }
    res.send(props);
})
.catch(err => {
    const props = {
        data: null,
        message: err,
        error: true
    }
    res.status(500).send(props);
});
  return result
}

}
