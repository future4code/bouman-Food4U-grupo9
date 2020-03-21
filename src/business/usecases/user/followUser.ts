import { FollowUserGateway } from "../../gateway/followUserGateway";
import { stringify } from "querystring";

export class FollowUserUC {
    constructor(private followUserDB: FollowUserGateway){}
    public async execute(input: FollowUserInputUC): Promise<FollowUserOutputUC>
    {   
        // condition: userId not following follodId and followId exists 
        const isConditionVerified = await this.followUserDB.verifyFollowUser(input.userId, input.followId)
        
        if (!isConditionVerified) {
            throw new Error("Conditions not acceptables")
        }

        await this.followUserDB.followUser(input.userId,input.followId)

        return{
            userId: input.userId,
            followId: input.followId
        }
    }
}


export interface FollowUserInputUC {

    userId: string;
    followId: string
  }

  
export interface FollowUserOutputUC {
    userId: string;
    followId: string
}