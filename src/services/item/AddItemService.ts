import prismaClient from "../../prisma";

interface ItemRequest {
    amount: number
    order_id: string
    product_id: string  
}

class AddItemService {
    async execute({amount, order_id, product_id}: ItemRequest) {

        const item = await prismaClient.item.create({
            data: {
                amount,
                order_id,
                product_id
            }
        })

        return item

    }
}

export {AddItemService}