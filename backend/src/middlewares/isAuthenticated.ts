import { Response, Request, NextFunction } from "express";

export function isAuthenticated(req:Request, res:Response, next: NextFunction) {
    console.log("Chamou o middleware")
    next()
}