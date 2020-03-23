import { User } from "../entities/user";

export interface UserGateway{
    createUser(user: User): Promise<void>
    login(email: string): Promise<User | undefined>
    getEmailById(id: string): Promise<string>
}