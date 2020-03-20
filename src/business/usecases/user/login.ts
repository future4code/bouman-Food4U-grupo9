import { UserDB } from "../../../data/userDataBase";
import * as bcrypt from "bcrypt"
import * as jwt from "jsonwebtoken"

export class LoginUC {
    constructor(private userDB: UserDB){}
    public async execute(input: LoginInputUC): Promise<LoginOutputUC> {
        
        const user = await this.userDB.login(input.email)

        if (!user) {
            throw new Error("User not found");
          }

        const passwordEncrypted = user.getPasswordEncrypted()
        const isPasswordCorrect = bcrypt.compare(input.password,passwordEncrypted)

        if (!isPasswordCorrect) {
            throw new Error("Password don't match");
        }
        
        const jwtSecretKey: string = "chave"
        const userId = user.getId()
        const token = jwt.sign({userId},jwtSecretKey,{expiresIn: "1h"})

        return {
            token
        }
    }
}
export interface LoginInputUC {
    email: string;
    password: string
  }

export interface LoginOutputUC {
    token: string;
}