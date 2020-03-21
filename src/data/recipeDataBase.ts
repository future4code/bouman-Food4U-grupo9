import { BaseDB } from "./dataDataBase";
import { RecipeGateway } from "../business/gateway/recipeGateway";
import { Recipe } from "../business/entities/recipe";
import { FeedGateway } from "../business/gateway/feedGateway";

export class RecipeDB extends BaseDB implements RecipeGateway, FeedGateway{
    private recipeTableName = "recipes_food4u";
    private followTableName = "follow_food4u"

    private mapDateToDbDate(input: Date): string {
        const year = input.getFullYear();
        const month = input.getMonth() + 1;
        const date = input.getDate();
        return `${year + "-" + month + "-" + date}`;
    }

    private mapDbDateToDate(input: string): Date {
    return new Date(input);
    }

    private mapDbRecipeToRecipe(input?: any): Recipe | undefined {
        return (
          input &&
          new Recipe(
            input.id,
            input.title,
            input.recipeDescription,
            this.mapDbDateToDate(input.creationDate),
            input.userId
          )
        );
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

    public async getFeed(userId: string): Promise<Recipe[]> {
        const result = await this.connection.raw(`
            SELECT * 
            FROM ${this.followTableName} follow
            JOIN ${this.recipeTableName} recipes
            ON follow.followId = recipes.userId
            WHERE follow.userId = '${userId}'
            ORDER BY creationDate asc;
        `)
        return result[0].map((res: any) => this.mapDbRecipeToRecipe(res)!);
    }
}

  