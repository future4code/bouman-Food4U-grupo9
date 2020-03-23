import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { CreateRecipeUC } from "../../business/usecases/recipe/createRecipe";
import { RecipeDB } from "../../data/recipeDataBase";

export const CreateRecipeEndPoint = async (req: Request, res: Response) => {
    try {
        const createRecipeUC = new CreateRecipeUC(new RecipeDB())
        const token = req.headers.auth as string
        const jwtSecretKey: string = "chave"
        const jwtData = jwt.verify(token, jwtSecretKey) as { userId: string}
        
        const result = await createRecipeUC.execute({
            title: req.body.title,
            recipeDescription: req.body.recipeDescription,
            userId: jwtData.userId
        })

        res.status(200).send(result);
    } catch(err){
        res.status(err.errorCode || 400).send({
            message: err.message
        })
    }
}