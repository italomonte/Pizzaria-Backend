import { CreateProductService, ProductRequest } from "../../services/product/CreateProductService"
import {Request, Response} from "express"

class CreateProductController {
    async handle (req: Request, res: Response) {

        const {name, price, description, category_id}  = req.body  

        const createProductService = new CreateProductService()

        if (!req.file) {
            throw new Error("error upload file")
        } else {

            const {originalname, filename} = req.file
            console.log(filename)
            const product = await createProductService.execute({
                name,
                price,
                description,
                banner: ' ',
                category_id 
            } as ProductRequest )

            return res.json(product)
        }
    }
}
export {CreateProductController}


