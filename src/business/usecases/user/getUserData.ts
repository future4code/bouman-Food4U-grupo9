import * as jwt from "jsonwebtoken";
import { UserGateway } from "../../gateway/userGateway";

export class GetUserDataUC {
    constructor(private userGateway: UserGateway) {}
    
    public async execute(input: string): Promise<GetUserDataOutputUC> {
        const jwtSecretKey: string = "chave"

        const jwtData = jwt.verify(input,jwtSecretKey) as {
            userId: string
        }

        const email = await this.userGateway.getEmailById(jwtData.userId)
        
        return {
            id: jwtData.userId,
            email
        }
    } 
}

export interface GetUserDataOutputUC {
    id: string;
    email: string;
}