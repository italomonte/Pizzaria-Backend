import { Request, Response } from "express";
import { RemoveItemService } from "../../services/item/RemoveItemService";

class RemoveItemController {
    async handle(req: Request, res: Response) {

        const item_id = req.query.item_id as string

        const removeItemService = new RemoveItemService()

        const item = await removeItemService.execute({item_id})

        res.json(item)
    }
}

export {RemoveItemController}