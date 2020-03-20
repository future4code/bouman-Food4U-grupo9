import { Request, Response } from "express";
import { UserDB } from "../../data/userDataBase";
import { GetUserDataUC } from "../../business/usecases/user/getUserData";

export const GetUserDataEndpoint = async (req: Request, res: Response) => {
    try {
        const getUserDataUC = new GetUserDataUC(new UserDB());
        const result = await getUserDataUC.execute(req.headers.auth as string)

        res.status(200).send(result)
    } catch(err){
        res.status(err.errorCode || 400).send({
            message: err.message
        })
    }
}