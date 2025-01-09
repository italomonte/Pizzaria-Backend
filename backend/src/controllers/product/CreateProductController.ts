import { CreateProductService, ProductRequest } from "../../services/product/CreateProductService"
import {Request, Response} from "express"

class CreateProductController {
    async handle (req: Request, res: Response) {

        const createProductService = new CreateProductService()

        //const {name, price, description, category_id}  = req.body  
        //let banner = ''
        
        const productRequest = req.body as ProductRequest
        
        const product = await createProductService.execute(productRequest)

        return res.json(product)
        
    }
}
export {CreateProductController}