import {NextFunction, Request, Response} from 'express';
import {OK, BAD_REQUEST} from 'http-status-codes';
import {Controller, Middleware, Get, Post, Put, Delete} from '@overnightjs/core';
import {updateUser, createUser, getUser} from "./queries";
import {omit} from "lodash";
import * as Errors from '../../errors'
import * as bcrypt from 'bcryptjs'
import {sign, validatePasswordMatch} from '../../utils';
import {verifyToken} from "../../authMiddleware";


@Controller('api/user')
export default class UserController {
  @Get()
  @Middleware([verifyToken])
  private async getUser(req: Request, res: Response) {
    const {user, token}: any = req
    return res.status(OK).json({user: omit(user, ['password']), token});
  }

  @Post()
  private async create(req: Request, res: Response, next: NextFunction) {
    try {
      const {email, nick_name, password} = req.body
      const user = await getUser(email)
      if (user) {
        throw Errors.userExists
      }
      const response = await createUser({email, nick_name, password: bcrypt.hashSync(password, 8)})
      const token = sign({email: response.email}, '30d')
      return res.status(OK).json({user: omit(response, ['password']), token});
    } catch (err) {
      next(err)
    }
  }


  @Put()
  @Middleware([verifyToken])
  private async update(req: Request, res: Response, next: NextFunction) {
    try {
      const {user}: any = req
      const data = {...req.body}
      if(data.password) {
        data.password = bcrypt.hashSync(data.password, 8)
      }
      const updatedUser = await updateUser(data, user.id)
      return res.status(OK).json(omit(updatedUser, ['password']));
    } catch (err) {
      next(err)
    }
  }


  @Post('login')
  private async login(req: Request, res: Response, next: NextFunction) {
    const {email, password} = req.body
    try {
      const user = await getUser(email)

      if (!user) {
        throw Errors.invalidCredentials
      }

      const comparePassword = validatePasswordMatch(password, user.password)

      if (!comparePassword) {
        throw Errors.invalidCredentials
      }

      const token = sign({email: user.email}, '30d')

      res.status(OK).json({
        user: omit(user, ['password']),
        token
      })
    } catch (err) {
      next(err)
    }
  }

}
