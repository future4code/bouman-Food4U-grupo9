import { RecipeGateway } from "../src/business/gateway/recipeGateway"
import { Recipe } from "../src/business/entities/recipe"
import { CreateRecipeUC } from "../src/business/usecases/recipe/createRecipe"

describe("Test create recipe usecase", () => {
  test('Should not throw an error', async () => {
    const recipeGateway: RecipeGateway = {
      async createRecipe(recipe: Recipe): Promise<void> {}
    }

    const useCase = new CreateRecipeUC(recipeGateway)

    const input = {
      title: 'receita',
      recipeDescription: 'descrição da receita',
      userId: '1'
    }

    await expect(useCase.execute(input)).resolves.not.toThrowError()
  })

  test('Should call DB function correctly', async () => {
    const recipeGateway: RecipeGateway = {
      createRecipe: jest.fn()
    }

    const useCase = new CreateRecipeUC(recipeGateway)

    const input = {
      title: 'receita',
      recipeDescription: 'descrição da receita',
      userId: '1'
    }

    await useCase.execute(input)
    expect(recipeGateway.createRecipe).toHaveBeenCalledTimes(1)
  })

})