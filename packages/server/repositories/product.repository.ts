import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();

export const productRepository = {
    getProduct(productId: number) {
        return prisma.product.findFirst({
            where: { id: productId }
        })
    }
}