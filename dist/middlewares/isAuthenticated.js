"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
// verifica que quem está tentnaod acessar aquela rota está logado
function isAuthenticated(req, res, next) {
    // Receber o token
    const authToken = req.headers.authorization;
    //Verificar se existe um token
    if (!authToken) {
        return res.status(401).end();
    }
    const [, token] = authToken.split(" ");
    try {
        // validar token
        const { sub } = (0, jsonwebtoken_1.verify)(token, process.env.JWT_SECRET);
        // adicionando numa variavel da requisição o id do usuário que está acessando a rota
        req.user_id = sub;
        return next();
    }
    catch (err) {
        return res.status(401).end();
    }
}
exports.isAuthenticated = isAuthenticated;
