import { omit } from 'lodash'
import { decode } from './utils'
import * as Error from './errors'
import {NextFunction, Request, Response} from "express";
import {getUser} from "./controllers/UserController/queries";

const validateToken = async (token: string) => {
  const decoded = await decode(token) as any
  let user = await getUser(decoded.email)
  if (!user) return null
  user = omit(user, ['password'])
  return user
}

export const checkToken = validateToken

export const verifyToken = async (req: any, res: Response, next: NextFunction) => {
  const token = req.headers.authorization ? req.headers.authorization.replace('Bearer', '').trim() : null
  if (!token) {
    return next(Error.noTokenProvided)
  }
  try {
    const user = await validateToken(token)
    if (!user) {
      return next(Error.failedAuthorizeToken)
    }
    req.user = user
    return next()
  } catch (err) {
    return next(Error.failedAuthorizeToken)
  }
}
