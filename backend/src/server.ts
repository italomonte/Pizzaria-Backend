import express, {Request, Response, NextFunction} from 'express'
import 'express-async-errors';
import cors from 'cors'
import path from 'path'

import {router} from './routes'

const app = express();
app.use(express.json());

// Poder ser acessado de qualquer ip
app.use(cors())
app.use(router);

// URL TO ACCESS FILES 
app.use(
    '/files',
    express.static(path.resolve(__dirname, '..', 'tmp'))
)

// Tratamento de erros
app.use((err : Error, req: Request, res: Response, next: NextFunction)=>{
    if(err instanceof Error){
        return res.status(400).json({
            error: err.message
        })
    }

    return res.status(500).json({
        status: 'error',
        message: 'Internal server error.'
    })
})

app.listen(3333, () =>{
    console.log("Servidor Online!!")
})