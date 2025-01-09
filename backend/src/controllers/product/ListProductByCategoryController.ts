import { ListProductByCategoryService } from "../../services/product/ListProductByCategoryService";
import {Request, Response} from 'express'

class ListProductByCategoryController {
    async handle(req: Request, res: Response){

        const listProductByCategoryService = new ListProductByCategoryService()

        const category_id = req.query.category_id as string

        const products = await listProductByCategoryService.excute({
            category_id
        })

        return res.json(products)

    }
}

export {ListProductByCategoryController}