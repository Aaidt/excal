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

    // compare the hashed pw

    try {
        const user = await prismaClient.user.findFirst({
            where: {
                username: parsedData.data.username,
                password: parsedData.data.password
            }
        })

        if (!user) {
            res.status(403).json({
                message: "User doesnt exist."
            });
            return;
        }

        const token = jwt.sign({
            userId: user?.id
        }, JWT_SECRET);

        res.json({
            token
        });
    } catch (e) {
        res.status(411).json({
            message: "Incorrect credentials."
        })
    }

})


app.post('/room', userMiddleware, async function (req, res) {

    const parsedData = CreateRoomSchema.safeParse(req.body);
    if (!parsedData.success) {
        res.json({
            error: 'Incorrect input'
        });
        return;
    }

    const userId = req.userId;
    if (!userId) {
        res.status(403).json({
            message: "Unauthorized."
        });
        return;
    }

    try {
        const room = await prismaClient.room.create({
            data: {
                slug: parsedData.data.name,
                adminId: userId
            }
        })

        res.json({
            roomId: room.id
        })
    } catch (e) {
        res.status(411).json({
            message: "Server error."
        })
    }

})


const port = process.env.PORT;
app.listen(port, () => {
    console.log('Server is listening on port: ' + port);
})