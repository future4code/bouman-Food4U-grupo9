export interface FollowUserGateway{
    followUser(userId: string, followId: string): Promise<void>
    verifyFollowUser(userId: string, followId: string): Promise<Boolean>
}