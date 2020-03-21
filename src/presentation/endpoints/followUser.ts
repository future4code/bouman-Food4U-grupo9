import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { FollowUserUC } from "../../business/usecases/user/followUser";
import { FollowUserDB } from "../../data/followUserDataBase";
export const FollowUserEndPoint = async (req: Request, res: Response) => {
    try {
        const followUserUC = new FollowUserUC(new FollowUserDB())
        const token = req.headers.auth as string
        const jwtSecretKey: string = "chave"
        const jwtData = jwt.verify(token,jwtSecretKey) as {userId: string}
        await followUserUC.execute({
            userId:jwtData.userId,
            followId: req.body.followId
        })
        const msg = "User followed"
        res.status(200).send(msg);
    } catch(err){
        res.status(err.errorCode || 400).send({
            message: err.message
        }) 
    }
}