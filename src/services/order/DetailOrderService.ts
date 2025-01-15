import prismaClient from "../../prisma";

interface DetailOrderRequest {
    order_id: string
}

class DetailOrderService {
    async execute({order_id}:DetailOrderRequest) {

        const orders = prismaClient.item.findMany({
            where: {
                order_id
            },
            include: { // inclue na resposta os detalhes das entidades das chaves estrangeiras
                product: true,
                order: true
            }
        })

        return orders

    }
}

export { DetailOrderService }