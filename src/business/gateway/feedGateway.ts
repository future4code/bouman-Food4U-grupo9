import { Recipe } from "../entities/recipe";

export interface FeedGateway{
    getFeed(userId: string): Promise<Recipe[]>
    
}