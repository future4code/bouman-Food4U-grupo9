export class User {
    constructor(
      private id: string,
      private followedUsers: string
    ) {}
  
    public getFollowedUsers(): string {
      return this.followedUsers;
    }
    public getId(): string {
      return this.id;
    }
  }