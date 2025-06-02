import express from "express"
import { userMiddleware } from "./middlewares/userMiddleware"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET ?? '';

const app = express();

app.post('signup', async function(req, res){

    //db call
    res.json({
        message: "You have successfully signed up!!!"
    })
})


app.post('signin', async function(req, res){

    const userId = 'asdsads';

    const token = jwt.sign({
        userId
    }, JWT_SECRET);

    res.json({
        token
    });
})


app.post('room', userMiddleware, async function(req, res){


})



const port = process.env.PORT;
app.listen(port, () => {
    console.log('Server is listening on port: ' + port);
})