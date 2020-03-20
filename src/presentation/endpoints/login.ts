import { LoginUC } from "../../business/usecases/user/login"
import { UserDB } from "../../data/userDataBase"
import { Request, Response } from "express";

export const LoginEndPoint = async (req: Request, res: Response) => {
    try {
        const loginUC = new LoginUC(new UserDB());
        const result = await loginUC.execute({
            email: req.body.email,
            password: req.body.password
        })
        res.status(200).send(result);
    } catch(err){
        res.status(err.errorCode || 400).send({
            message: err.message
        })
    }
}

