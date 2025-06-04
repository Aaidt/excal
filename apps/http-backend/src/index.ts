import express from "express"
import { userMiddleware } from "./userMiddleware"
import jwt from "jsonwebtoken"
import { CreateUserSchema, SigninSchema, CreateRoomSchema } from "@repo/common/types"
import { JWT_SECRET } from "@repo/backend-common/config"
import { prismaClient } from "@repo/db/client"
import bcrypt from "bcrypt"
import cors from 'cors';
import dotenv from "dotenv"
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.post('/signup', async function (req, res) {

    const parsedData = CreateUserSchema.safeParse(req.body);
    if (!parsedData.success) {
        res.json({
            error: 'Incorrect input'
        });
        return;
    }

    const hashedPassword = await bcrypt.hash(parsedData.data.password, 5)

    try {
        const user = await prismaClient.user.create({
            data: {
                username: parsedData.data.username,
                password: hashedPassword,
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

    try {
        const user = await prismaClient.user.findFirst({
            where: {
                username: parsedData.data.username
            }
        })

        if (!user) {
            res.status(403).json({
                message: "User doesnt exist."
            });
            return;
        }

        const isRealUser = bcrypt.compare(parsedData.data.password, user.password)

        if (!isRealUser) {
            res.status(411).json({
                message: "Password is incorrect."
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
            message: "Room with this name already exists."
        })
    }

})

app.get('/chats/:roomId', async function (req, res) {
    const roomId = Number(req.params.roomId);
    try {
        const messages = await prismaClient.chat.findMany({
            where: {
                roomId: roomId
            },
            orderBy: {
                id: "desc"
            },
            take: 50
        });

        res.json({
            messages
        })
    }catch(e){
        res.status(403).json({
            message: "Room could not be found."
        })
    }
})

app.get('/room/:slug', async function (req, res) {
    const slug = req.params.slug;
    try {
        const room = await prismaClient.room.findFirst({
            where: {
                slug
            }
        });
        res.json({
            roomId: room?.id
        })
    }catch(e){  
        res.status(403).json({
            message: "Room could not be found."
        })
    }
})

const port = process.env.PORT;
app.listen(port, () => {
    console.log('Server is listening on port: ' + port);
})