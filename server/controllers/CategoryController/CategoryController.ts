import {Request, Response} from 'express';
import {OK, BAD_REQUEST} from 'http-status-codes';
import {Controller, Get} from '@overnightjs/core';
import {getCategories} from "./queries";


@Controller('api/category')
export default class CategoryController {
  @Get()
  private async getCategories(req: Request, res: Response) {
    try {
      const result = await getCategories();
      return res.status(OK).json(result);
    } catch (err) {
      return res.status(BAD_REQUEST).json({message: err});
    }
  }
}
