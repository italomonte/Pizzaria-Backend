import prismaClient from '../../prisma';
import {hash} from 'bcryptjs';
// tipar faz a passagem desses parametros ser obrigatoria
interface UserRequest {
    name: string;
    email: string;
    password: string;
}

class CreateUserService {
    async execute({name, email, password}: UserRequest){

        // verificar se ele enviou um email
        if(!email){
            throw new Error("Email Incorreto")
        }

        // verificar se o email ja esta cadastrado
        const userAlreadryExists = await prismaClient.user.findFirst({
            where: {
                email: email
            }
        })

        if(userAlreadryExists){
            throw new Error("Esse Usuario já existe")
        }

        const passwordHash = await hash(password, 8)

        const user = await prismaClient.user.create({
            data :{
                name: name,
                email: email,
                password: passwordHash,
            }, select:{
                id:true,
                name: true,
                email:true,
            }

            
        })


        return user;
    }
}

export { CreateUserService }