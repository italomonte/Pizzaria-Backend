import prismaClient from "../../prisma";
import {compare} from 'bcryptjs';
import { sign } from 'jsonwebtoken';

interface AuthInterface {
    email: string;
    password: string;
}

class AuthUserService{
    async excute ({email, password}: AuthInterface){

        // Verificar se o email existie
        const user = await prismaClient.user.findFirst({
            where:{ email: email }
        })

        if (!user) {
            throw new Error("Usuario ou senha inválidos");
        }

        const passwordMatch = await compare(password, user.password)

        if (!passwordMatch) {
            throw new Error("Usuario ou senha inválidos");
        }

        // Se deu tudo certo vamos gerar um token jwt 
        const token = sign(
            {
                name: user.name,
                email: user.email,
            },
            process.env.JWT_SECRET,
            {
                subject: user.id,
                expiresIn: '30d'
            }
        )

        return {
            id:user.id,
            name: user.name,
            email: user.email,
            token: token,
        }
    }
}

export {AuthUserService}