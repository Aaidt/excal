import express from "express"
import { userMiddleware } from "./userMiddleware"
import jwt from "jsonwebtoken"
import { CreateUserSchema, SigninSchema, CreateRoomSchema } from "@repo/common/types"
import { JWT_SECRET } from "@repo/backend-common/config"
import { prismaClient } from "@repo/db/client"
import dotenv from "dotenv"
dotenv.config();


const app = express();
app.use(express.json());

app.post('/signup', async function (req, res) {

    const parsedData = CreateUserSchema.safeParse(req.body);
    if (!parsedData.success) {
        res.json({
            error: 'Incorrect input'
        });
        return;
    }

    try {
        const user = await prismaClient.user.create({
            data: {
                username: parsedData.data.username,
                // hash the password
                password: parsedData.data.password,
                name: parsedData.data.name,

            }
        })

        res.json({
            userId: user.id
        })
    } catch (e) {
        res.status(411).json({
            message: "This username already exists."
        })
    }

})


app.post('/signin', async function (req, res) {

    const parsedData = SigninSchema.safeParse(req.body);
    if (!parsedData.success) {
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


app.post('/room', userMiddleware, async function (req, res) {

    const parsedData = CreateUserSchema.safeParse(req.body);
    if (!parsedData.success) {
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