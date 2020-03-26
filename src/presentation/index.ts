import express from "express";
import { CreateUserEndPoint } from "./endpoints/createUser";
import { LoginEndPoint } from "./endpoints/login";
import { GetUserDataEndpoint } from "./endpoints/getUserData";
import { CreateRecipeEndPoint } from "./endpoints/createRecipe";
import { FollowUserEndPoint } from "./endpoints/followUser";
import { FeedEndPoint } from "./endpoints/feed"

const app = express();
app.use(express.json());

app.post("/createUser", CreateUserEndPoint); // elo
app.post("/createRecipe", CreateRecipeEndPoint); // elo
app.post("/followUser", FollowUserEndPoint); //rav
app.get("/feed", FeedEndPoint); //elo
app.get("/login", LoginEndPoint); //rav
app.get("/getUserData", GetUserDataEndpoint); //rav

export default app;