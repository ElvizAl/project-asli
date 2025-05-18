import { getUserSession } from "@/actions/auth-actions";
import { prisma } from "@/db/prisma";

export const getFruits = async () => {
    const session = await getUserSession();

    if(!session || session.role !== "USER") {
        throw new Error("Unauthorized");
    }

    try {
        const result = await prisma.fruit.findMany();
        return result
    } catch (error) {
        console.log(error)
    }
}