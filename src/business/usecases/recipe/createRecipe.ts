import { v4 } from "uuid";
import { Recipe } from "../../entities/recipe";
import { RecipeGateway } from "../../gateway/recipeGateway";

export class CreateRecipeUC {
    constructor(private recipeGateway: RecipeGateway){}
    public async execute(input: CreateRecipeInputUC): Promise<CreateRecipeOutputUC> {
        const id = v4();

        if (input.title === "" || input.recipeDescription === "") {
            throw new Error("Invalid paramethers");
        }
        
        await this.recipeGateway.createRecipe(
            new Recipe(id, input.title, input.recipeDescription, new Date(),input.userId)
          );

        return{
            id: id,
            title: input.title,
            recipeDescription: input.recipeDescription,
            creationDate: new Date(),
            userId: input.userId
        }
    }
}

export interface CreateRecipeInputUC {

    title: string,
    recipeDescription: string,
    userId: string 
  }

export interface CreateRecipeOutputUC {
    id: string,
    title: string,
    recipeDescription: string,
    creationDate: Date,
    userId: string
}