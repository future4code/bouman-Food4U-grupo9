import { BaseDB } from "./dataDataBase";
import { User } from "../business/entities/user";


export class UserDB extends BaseDB{
    private userTableName = "users_food4u";

    public async createUser(user: User): Promise<void> {
        await this.connection.raw(`
        INSERT INTO ${this.userTableName} (id, email, passwordEncrypted)
        VALUES(
            '${user.getId()}',
            '${user.getEmail()}',
            '${user.getPasswordEncrypted()}'
        )`)
    }

    private mapDbUserToUser(input?: any): User | undefined {
        return (
          input &&
          new User(
            input.id,
            input.email,
            input.passwordEncrypted
          )
        );
      }

    public async login(email: string): Promise<User | undefined> {
        const result = await this.connection.raw(`
        SELECT * 
        FROM ${this.userTableName}
        WHERE email like '${email}'
        `)

        return this.mapDbUserToUser(result[0][0])
    }
    public async getEmailById(id: string): Promise<string> {
        const result = await this.connection.raw(`
        SELECT email 
        FROM ${this.userTableName}
        WHERE id like '${id}'
        `)

        return result[0][0].email
    }


}
