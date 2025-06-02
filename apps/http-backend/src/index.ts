import express from "express"
import { userMiddleware } from "./middlewares/userMiddleware"
import jwt from "jsonwebtoken"
import { CreateUserSchema, SigninSchema, CreateRoomSchema } from "./schema"
import dotenv from "dotenv"
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET ?? '';

const app = express();

app.post('signup', async function(req, res){

    const parsedData = CreateUserSchema.safeParse(req.body);
    if(!parsedData.success){
        res.json({
            error: 'Incorrect input'
        });
        return;
    }

    //db call
    res.json({
        message: "You have successfully signed up!!!"
    })
})


app.post('signin', async function(req, res){

    const parsedData = SigninSchema.safeParse(req.body);
    if(!parsedData.success){
        res.json({
            error: 'Incorrect input'
        });
        return;
    }

    const userId = 'asdsads';

    const token = jwt.sign({
        userId
    }, JWT_SECRET);

    res.json({
        token
    });
})


app.post('room', userMiddleware, async function(req, res){

    const parsedData = CreateUserSchema.safeParse(req.body);
    if(!parsedData.success){
        res.json({
            error: 'Incorrect input'
        });
        return;
    }

    res.json({
        roomId: 123
    })
})



const port = process.env.PORT;
app.listen(port, () => {
    console.log('Server is listening on port: ' + port);
})