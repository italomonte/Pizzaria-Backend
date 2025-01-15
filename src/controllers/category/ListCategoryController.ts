import {ListCategoryService} from "../../services/category/ListCategoryService"
import  {Request, Response } from "express"

class ListCategoryController {
    async handle(req: Request, res: Response){

        const readCategoryService = new ListCategoryService()

        const categories = await readCategoryService.execute()

        return res.json(categories)

    }
}

export { ListCategoryController }