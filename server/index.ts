import { route } from 'awilix-express';

import next from "next";
import express from "express";
import bodyParser from "body-parser";
import { loadControllers, scopePerRequest } from 'awilix-express';
import fileUpload from 'express-fileupload'
import {PassportStatic} from 'passport';
import container from "./container";
import { IIdentity } from "../src/common";
import { Request, Response, NextFunction } from 'express';
import cookieParser from 'cookie-parser';
import cookieSession from 'cookie-session';
import config from "../config";
import compression from 'compression';
import httpStatus from '../http-status';

const passport = container.resolve<PassportStatic>('passport')
const port = parseInt(process.env.PORT || "3000", 10);
const dev = process.env.NODE_ENV !== "production";
 export const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express()

  server.use(bodyParser.json({ limit: '10mb' }));
  server.use(bodyParser.urlencoded({ extended: true }));
  server.use(cookieSession({
    name: 'session',
    keys: [config.jwtSecret],
    maxAge: 312460601000,
  }));
  server.use(cookieParser())
  server.use(compression());
  server.use(passport.initialize());  
  server.use(fileUpload({}));
  server.use(answers)
  server.use(acl);


  server.use(scopePerRequest(container));
  const files = 'controllers/**/*.ts';
  server.use(loadControllers(files, { cwd: __dirname }));

  
  server.all('*', (req, res) => {
    return handle(req, res)
  })
  
  server.listen(port, (err) => {
    if (err) throw err
    console.log(
      `> Server listening at http://localhost:${port} as ${
        dev ? "development" : process.env.NODE_ENV
      }`
    );
  })
  // tslint:disable-next-line:no-console
  
});

const answers = (req: Request, res: Response, next: NextFunction) => {
  res.answer = (data: any, message: any = null, status: number = httpStatus.OK) => {
    return res.status(status).json({
      data,
      message,
      error : status != 200? true : false,
    });
  }
  res.print = (pathName: string, ssrData: any) => {
    req.ssrData = ssrData,
    app.render(req, res, pathName, req.params)
  }
  next()
}

const acl = (req: Request, res: Response, next: NextFunction) => {
  let useAcl = true
  const url = req.url
  for (const item of IGNORS) {
    if (url.startsWith(item)) {
      useAcl = false
    }
  }

  if (useAcl) {
    const jwt = passport.authenticate('local-jwt', (err, identity: IIdentity) => {
      const isLogged = identity && identity.id ;
      if (!isLogged) {
        const isAPICall = req.path.toLowerCase().includes('api')
        if (isAPICall) {

            return res.json({
              data : null,
              message: 'You are not authorized to open this page',
              error: true,
            })
        }
         else {
            // return res.redirect('/');            
            return handle(req, res);
        }
      }
      req.identity = identity;
      next()
    });
    jwt(req, res, next);
  } else {
    next()
  }
}


export const IGNORS = [
  '/favicon.ico',
  '/_next',
  '/static',
  '/sitemap.xml',
  '/robots.txt',
  '/service-worker.js',
  '/manifest.json',
  '/styles.chunk.css.map',
  '/__nextjs',
  '/api/users/login',
  '/api/users/registration',
  '/api/properties',
  '/api/users/',
  '/api/reviews/',
  '/api/properties/by_token'
];