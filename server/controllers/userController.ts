import { Request, Response, NextFunction } from 'express';
import { route, GET, POST } from "awilix-express";
import BaseContext from '../baseContext';
import { IIdentity } from 'src/common';
import httpStatus from "../../http-status";

@route("/api/users")
export default class UserController extends BaseContext {

  @POST()
  @route('/login')
  public login(req: Request, res: Response, next: NextFunction) {
    const { passport } = this.di;
    return passport.authenticate('local-login', (errors, identity: IIdentity) => {
      console.log('login controller passport ', identity);
      if (identity) {
        res.cookie('token', identity.token, { maxAge: 1000606024 }, { message: 'You have successfully logged in!' })
        return res.answer({ identity, error: false });
      } else {
        console.log('Validations denied : ', errors)
        res.answer(null, errors, "properties can't be found", httpStatus[500]);
      }
    })(req, res, next);
  }

  @POST()
  @route("/registration")
  public registration(req: Request, res: Response, next: NextFunction) {
    const { passport } = this.di;
    return passport.authenticate('local-signup', (errors, identity: IIdentity) => {
      console.log("Registration controller passport", identity)
      if (identity) {
        res.answer(identity, 'Registration completed successfully!!! You can now log in.', httpStatus[500])
      } else {
        console.log('Register catch : ', errors)
        res.answer(null, errors, 'Could not process register', httpStatus[301]);
      }
    })(req, res, next);
  }

  @route('/by_token') // Find a single UserModel with token
  @GET()
  getUserByToken(req: Request, res: Response) {
    const { UserService, JwtStrategy } = this.di;
    const token = JwtStrategy.getJwtFromRequest(req);
    UserService.getUserByToken(token)
      .then(data => { res.answer(data, "request successfully") })
      .catch(err => { res.answer(null, err, httpStatus[500]) });
  };

  @route('/:id')
  @GET()
  getById(req: Request, res: Response) {
    const { UserService } = this.di;
    UserService.findOneByID(req.params.id)
      .then(users => { res.answer(users, "users are found successfully", httpStatus.OK) })
      .catch(err => { res.answer(null, err, httpStatus[500]) });
  }

  @route('/')
  @GET()
  getAll(req: Request, res: Response) {
    const { UserService } = this.di
    UserService.findAll()
      .then(users => { res.answer(users, "users are found successfully", httpStatus.OK) })
      .catch(err => { res.answer(null, err, httpStatus[500]) });
  }

  // @route('/delete/:id')
  // @DELETE()
  // delete(req: Request, res: Response) {
  //   const { UserService } = this.di;

  //   const result = UserService.deleteByID(req.params.id)
  //     .then((data) => {
  //       res.status(200).send(data)
  //     })
  //     .catch((err) => {
  //       res.json(null, err, "error")
  //     })
  //     return result
  // }

}