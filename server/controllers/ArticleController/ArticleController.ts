import {Request, Response} from 'express';
import {OK, BAD_REQUEST} from 'http-status-codes';
import {Controller, Get, Middleware, Post} from '@overnightjs/core';
import {getArticles, createArticle, getArticle} from "./queries";
import {verifyToken} from "../../authMiddleware";


@Controller('api/article')
export default class ArticleController {
  @Get('list')
  private async getList(req: Request, res: Response) {
    const {query = '', order = ''}: any = req.query
    try {
      const result = await getArticles({query, order});
      return res.status(OK).json(result);
    } catch (err) {
      return res.status(BAD_REQUEST).json({message: err});
    }
  }

  @Get(':id')
  private async getArticle(req: Request, res: Response) {
    const {id}: any = req.params
    try {
      const result = await getArticle(id);
      return res.status(OK).json(result);
    } catch (err) {
      return res.status(BAD_REQUEST).json({message: err});
    }
  }


  @Post()
  @Middleware([verifyToken])
  private async create(req: Request, res: Response) {
    const {title, text, category, user_id = 1} = req.body
    try {
      const result = await createArticle({title, text, category, user_id});
      return res.status(OK).json(result);
    } catch (err) {
      return res.status(BAD_REQUEST).json({message: err});
    }
  }
}

