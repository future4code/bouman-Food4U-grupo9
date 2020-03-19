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
}