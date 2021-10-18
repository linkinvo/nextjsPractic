import BaseContext from "../baseContext";
import { route, GET, POST } from "awilix-express";
import { Request, Response } from 'express';

@route("/api/reviews")
export default class ReviewsController extends BaseContext {

  @route("/create")
  @POST()
  create(req, res) { }

  @route("/")
  @GET()
  getAllReviews(req: Request, res: Response) {
    const { ReviewsServices } = this.di;

    const result = ReviewsServices.findAll()
    .then(reviews => {
      const props = {
        data: reviews,
        message: "users are found successfully",
        error: false
      }
      res.send(props);

      res.answer(reviews, "users are found successfully");
    })
    .catch(err => {
      const props = {
        data: null,
        message: err,
        error: true
      }
      res.status(500).send(props);

      res.answer(null, "user can't be found", 500);

    });
    return result
  }

  @route("/save/:id")
  @POST()
  save(req: Request, res: Response) {
    const { ReviewsServices } = this.di;

    const result = ReviewsServices.save(req.body, req.params.id)
    .then(reviews => {
      const props = {
        data: reviews,
        message: "users are found successfully",
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


  
  @route("/by_property_id/:id")
  @GET()
  findReviewsByPropertyId(req, res) {
    const id = req.params.id;
    const { ReviewsServices } = this.di;
    return ReviewsServices.findReviewsByPropertyId(id)    
    .then(data => {
      const answer ={
        data: data,
        message: 'request successfull',
        error: false
      }
      res.send(answer)
    })
    .catch(err => {
      const answer = {
        data: null,
        message: err,
        error: true
      }
      res.status(500).send(answer);
    })
  }

  
  @route('/:id')
  @GET()
  getById(req: Request, res: Response) {
    const { ReviewsServices } = this.di;

    const result = ReviewsServices.findOneByID(req.params.id)
      .then(reviews => {
        const props = {
          data: reviews,
          message: "users are found successfully",
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