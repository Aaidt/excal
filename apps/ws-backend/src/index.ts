import { WebSocketServer, WebSocket } from "ws"
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from "@repo/backend-common/config"
import { prismaClient } from "@repo/db/client"
import dotenv from "dotenv";
dotenv.config();

const wss = new WebSocketServer({ port: 8080 });

interface User {
    ws: WebSocket,
    rooms: string[],
    userId: string
}

const users: User[] = []

function checkUser(token: string): string | null {
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        if (typeof decoded == 'string') {
            return null
        }
        if (!decoded || !decoded.userId) {
            return null
        }
        console.log('verified')
        return decoded.userId
    } catch (e) {
        console.log(e)
        return null
    }
}

wss.on('connection', function connection(ws, request) {
    console.log('Incoming connection');
    const url = request.url;
    if (!url) {
        console.log('no url')
        return
    }
    const queryParams = new URLSearchParams(url.split('?')[1]);
    const token = queryParams.get('token') ?? '';
    console.log('got token' + token)

    const userId = checkUser(token);

    if (userId == null) {
        console.log('token is null')
        ws.close()
        return null
    }

    users.push({
        userId,
        rooms: [],
        ws
    })

    ws.on('error', console.error);

    ws.on('message', async function message(data) {
        let parsedData;
        try {
            parsedData = JSON.parse(data as unknown as string);
        } catch (e) {
            console.log('Invalid JSON recived ' + data);
            ws.send(JSON.stringify({ type: 'error', message: 'Invalid JSON' }))
            return;
        }

        if (parsedData.type === 'join_room') {
            const user = users.find(x => x.ws === ws);
            user?.rooms.push(parsedData.roomId);
        }

        if (parsedData.type === 'leave_room') {
            const user = users.find(x => x.ws === ws);
            if (!user) {
                return;
            }
            user.rooms = user.rooms.filter(x => x !== parsedData.roomId)
        }

        if (parsedData.type === 'chat') {
            const roomId = parsedData.roomId;
            const message = parsedData.message;

            await prismaClient.chat.create({
                data: {
                    roomId,
                    messages: message,
                    userId
                }
            })

            users.forEach(user => {
                if (user.rooms.includes(roomId)) {
                    user.ws.send(JSON.stringify({
                        type: 'chat',
                        message: message,
                        roomId
                    }))
                }
            })
        }

    })

    ws.send('You are connected!!!');
})