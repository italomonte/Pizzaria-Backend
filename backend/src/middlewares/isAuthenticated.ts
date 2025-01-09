import { Payload } from "@prisma/client/runtime/library";
import { Response, Request, NextFunction } from "express";
import { verify } from "jsonwebtoken"

interface PayLoad {
    sub: string;
}

export function isAuthenticated
    (req:Request,
     res:Response
     , next: NextFunction
    ) {

    // Receber o token
    const authToken = req.headers.authorization;

    //Verificar se existe um token
    if (!authToken) {
        return res.status(401).end()
    }

    const [, token] = authToken.split(" ")

    console.log(token)

    try {
        // validar token
        const { sub } = verify(
        token,
        process.env.JWT_SECRET
        ) as PayLoad

        // adicionando numa variavel da requisição o id do usuário que está acessando a rota
        req.user_id = sub;

        return next()

    } catch (err) {
        return res.status(401).end()
    }
}