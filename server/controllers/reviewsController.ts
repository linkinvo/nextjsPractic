import BaseContext from "../baseContext";
import { route, GET, POST } from "awilix-express";
import { Request, Response } from 'express';
import httpStatus from "../../http-status";

@route("/api/reviews")
export default class ReviewsController extends BaseContext {

  @route("/")
  @GET()
  getAllReviews(req: Request, res: Response) {
    const { ReviewsServices } = this.di;
    ReviewsServices.findAll()
      .then(reviews => { res.answer(reviews, "users are found successfully") })
      .catch(err => { res.answer(null, err, "user can't be found", httpStatus[500]) });
  }

  @route("/by_property_id/:id")
  @GET()
  findReviewsByPropertyId(req, res) {
    const id = req.params.id;
    const { ReviewsServices } = this.di;
    ReviewsServices.findReviewsByPropertyId(id)
      .then(data => { res.answer(data, 'request successfully', httpStatus[200]) })
      .catch(err => { res.answer(null, err, httpStatus[500]) })
  }

  @route('/:id')
  @GET()
  getById(req: Request, res: Response) {
    const { ReviewsServices } = this.di;
    ReviewsServices.findOneByID(req.params.id)
      .then(reviews => { res.answer(reviews, "users are found successfully", httpStatus[200]) })
      .catch(err => { res.answer(null, err, httpStatus[500]) });
  }
}