import { v4 } from "uuid";
import { UserDB } from "../../../data/userDataBase";
import * as bcrypt from "bcrypt"
import { User } from "../../entities/user";

export class CreateUserUC {
    constructor(private userDB: UserDB){}
    public async execute(input: CreateUserInputUC): Promise<CreateUserOutputUC> {
        const id = v4();

        if (input.email.indexOf("@") === -1) {
            throw new Error("Invalid email");
        }
        if (input.password.length < 6){
            throw new Error("At least 6 characters for the password")
        }

        const passwordEncrypted =await bcrypt.hash(input.password,10)

        await this.userDB.createUser(
            new User(id, input.email, passwordEncrypted)
          );

        return{
            id:id,
            email:input.email,
            password:passwordEncrypted
        }
    }
}

export interface CreateUserInputUC {
 
    email: string;
    password: string
  }

export interface CreateUserOutputUC {
    id: string;
    email: string;
    password: string
}