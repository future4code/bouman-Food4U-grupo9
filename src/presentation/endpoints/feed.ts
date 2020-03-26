import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { FeedUC } from "../../business/usecases/recipe/feed";
import { RecipeDB } from "../../data/recipeDataBase";

export const FeedEndPoint = async (req: Request, res: Response) => {
    try {
        const feedUC = new FeedUC(new RecipeDB())
        const token = req.headers.auth as string
        const jwtSecretKey: string = "chave"
        const jwtData = jwt.verify(token,jwtSecretKey) as {userId: string}
        
        const result = await feedUC.execute(jwtData.userId)
        res.status(200).send(result);
    } catch(err){
        res.status(err.errorCode || 400).send({
            message: err.message
        })
    }
}