import express, { Request, Response } from "express";
import { CreateUserEndPoint } from "./endpoints/createUser";


const app = express();
app.use(express.json());

app.post("/createUser", CreateUserEndPoint);

export default app;
