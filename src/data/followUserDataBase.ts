import { BaseDB } from "./dataDataBase";
import { FollowUserGateway } from "../business/gateway/followUserGateway";

export class FollowUserDB extends BaseDB implements FollowUserGateway{
    private followTableName = "follow_food4u";
    private userTableName = "users_food4u";

    public async verifyFollowUser(inputUserId: string, inputFollowId: string): Promise<Boolean> {
        const followIdExists = await this.connection.raw(`
            SELECT * FROM ${this.userTableName}
            WHERE id = "${inputUserId}";
        `)
        
        const isFollowed = await this.connection.raw(`
            SELECT * FROM ${this.followTableName}
            WHERE userId = "${inputUserId}" and followId = "${inputFollowId}" 
        `)

        return (followIdExists[0][0] && !isFollowed[0][0])
    }

    public async followUser(inputUserId: string, inputFollowId: string): Promise<void> {
        await this.connection.raw(`
            INSERT INTO ${this.followTableName} (userId, followId)
            VALUES ('${inputUserId}','${inputFollowId}')   
        `)
    }
}
