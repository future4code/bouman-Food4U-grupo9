import { UserDB } from "../../../data/userDataBase";
import * as jwt from "jsonwebtoken"
export class GetUserDataUC {
    constructor(private userDB: UserDB){}

    
    public async execute(input: string): Promise<GetUserDataOutputUC>{
        const jwtSecretKey: string = "chave"
        const jwtData = jwt.verify(input,jwtSecretKey) as {
            userId: string
        }

        const email = await this.userDB.getEmailById(jwtData.userId)
        return {
            id:jwtData.userId,
            email
        }
    } 

}

export interface GetUserDataOutputUC {
    id: string;
    email: string;
}