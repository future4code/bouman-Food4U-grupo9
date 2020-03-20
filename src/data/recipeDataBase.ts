import { BaseDB } from "./dataDataBase";
import { RecipeGateway } from "../business/gateway/recipeGateway";
import { Recipe } from "../business/entities/recipe";

export class RecipeDB extends BaseDB implements RecipeGateway{
    private recipeTableName = "recipes_food4u";

    private mapDateToDbDate(input: Date): string {
        const year = input.getFullYear();
        const month = input.getMonth() + 1;
        const date = input.getDate();
        return `${year + "-" + month + "-" + date}`;
    }

    private mapDbDateToDate(input: string): Date {
    return new Date(input);
    }

    public async createRecipe(recipe: Recipe): Promise<void> {
        await this.connection.raw(`
            INSERT INTO ${this.recipeTableName} (id, title, recipeDescription, creationDate, userId)
            VALUES(
                '${recipe.getId()}',
                '${recipe.getTitle()}',
                '${recipe.getRecipeDescription()}',
                '${this.mapDateToDbDate(recipe.getCreationDate())}',
                '${recipe.getUserId()}'
            )
        `)
    }
}
