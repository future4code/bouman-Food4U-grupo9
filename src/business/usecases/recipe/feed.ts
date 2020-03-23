import { FeedGateway } from "../../gateway/feedGateway";
import { Recipe } from "../../entities/recipe";

export class FeedUC {
    constructor(private feedDB: FeedGateway){}

    public async execute(input: string): Promise<Recipe[]> {
        const result = await this.feedDB.getFeed(input)
        return result
    }
}