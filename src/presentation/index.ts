import express, { Request, Response } from "express";
import { CreateUserEndPoint } from "./endpoints/createUser";
import { LoginEndPoint } from "./endpoints/login";
import { GetUserDataEndpoint } from "./endpoints/getUserData";


const app = express();
app.use(express.json());

app.post("/createUser", CreateUserEndPoint);
app.get("/login", LoginEndPoint);
app.get("/getUserData", GetUserDataEndpoint);
export default app;
