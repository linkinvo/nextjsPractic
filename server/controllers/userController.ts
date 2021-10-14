import { Request, Response, NextFunction } from 'express';
import { route, GET, POST } from "awilix-express";
import BaseContext from '../baseContext';
import { IIdentity } from 'src/common';

@route("/api/users")
export default class UserController extends BaseContext {

  @POST()
  @route('/login')
  public login(req: Request, res: Response, next: NextFunction) {
    const { passport } = this.di;
    return passport.authenticate('local-login', (errors, identity) => {
      console.log('login controller passport ', identity);
      if (identity) {
        res.cookie('token', identity.token, { maxAge: 1000606024 }, { message: 'You have successfully logged in!' })
        return res.json({ identity, error: false });
      } else {
        console.log('Validations denied : ', errors)
        res.json({
          identity: null,
          message: 'Could not process validations',
          error: true,
        })
      }
    })(req, res, next);
  }

  @route("/registration")
  @POST()
  public registration(req: Request, res: Response, next: NextFunction) {
    const { passport } = this.di;

    return passport.authenticate('local-signup', (errors, identity) => {
  
      if (identity) {
        res.json({
          identity,
          message: 'Registration completed successfully!!! You can now log in.',
          error: false
        })
      } else {
        console.log('Register catch : ', errors)
        res.status(301).json({
          identity: null,
          message: 'Could not process register',
          error: errors
        })
      }
    })(req, res, next);
  }


  // @POST()
  // @route('/auth')
  // public jwt(req:Request, res: Response, next: NextFunction) {
  //   console.log('AUTH!!!!!!!!!!!!!!!!!!');
  //   const { passport } = this.di;
  //   console.log(2);

  //   return passport.authenticate('jwt', (err, identity) => {
  //     const isLogged = identity && identity.id;
  //     req.identity = identity;
  //     if(!isLogged) {
  //       // req.session.identity = identity;
  //     }
  //     const isAllow = undefined
  //     if(!isAllow) {
  //       return res.json(null, console.log('NOT FOUND 404'))
  //     }
  //   })
  // }


  @route('/save/:id')
  @POST()
  save(req: Request, res: Response) {
    const { UserService } = this.di;

    const result = UserService.save(req.body, req.params.id)
      .then(users => {
        const props = {
          data: users,
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


 

  @route('/by_token') // Find a single UserModel with token
    @GET()
    getUserByToken(req: Request, res: Response) {
      console.log(1)
        const { UserService ,JwtStrategy } = this.di;
        
        const token = JwtStrategy.getJwtFromRequest(req);
        return UserService.getUserByToken(token)

            .then(data => {
                const answer = {
                    data: data,
                    message: "request successfull",
                    error: false
                }
                res.send(answer);
            })
            .catch(err => {
                const answer = {
                    data: null,
                    message: err,
                    error: true
                }
                res.status(500).send(answer);
            });
    };

    @route('/:id')
    @GET()
    getById(req: Request, res: Response) {
      const { UserService } = this.di;
      const result = UserService.findOneByID(req.params.id)
        .then(users => {
          const props = {
            data: users,
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
      console.log("result", result)
  
      return result
    }


  @route('/')
  @GET()
  getAll(req: Request, res: Response) {
    const { UserService } = this.di
    const result = UserService.findAll()
      .then(users => {
        const props = {
          data: users,
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