import {NextFunction, Request, Response} from 'express';
import {OK} from 'http-status-codes';
import {Controller, Get, Middleware, Post} from '@overnightjs/core';
import {creatComment, getComments} from "./queries";
import {verifyToken} from "../../authMiddleware";


@Controller('api/comment')
export default class CommentController {
  @Get(':article_id')
  private async getComments(req: Request, res: Response, next: NextFunction) {
    const {article_id} = req.params
    try {
      const result = await getComments(parseInt(article_id));
      return res.status(OK).json(result);
    } catch (err) {
      next(err)
    }
  }

  @Post('')
  @Middleware([verifyToken])
  private async createComment(req: Request, res: Response, next: NextFunction) {
    const data = req.body
    const {user}: any = req
    data.user_id = user.id
    try {
      const comment = await creatComment(data);
      return res.status(OK).json(comment);
    } catch (err) {
      next(err)
    }
  }
}
