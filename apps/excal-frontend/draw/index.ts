import axios from "axios";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

type Shapes = {
    type: "Rect",
    x: number,
    y: number,
    width: number,
    height: number
} | {
    type: "circle",
    centerX: number,
    centerY: number,
    radius: number
}

export default async function initDraw(canvas: HTMLCanvasElement, roomId: string, socket: WebSocket) {

    const ctx = canvas.getContext('2d');
    if (!ctx) return

    const existingShapes: Shapes[] = await getExistingShapes(roomId)
    // console.log(existingShapes)

    socket.onmessage = (event) => {
        const message = JSON.parse(event.data)

        if (message.type === "chat") {
            const parsedShape = JSON.parse(message.message);
            existingShapes.push(parsedShape.shape)
            clearCanvas(existingShapes, canvas, ctx);
        }
    }


    clearCanvas(existingShapes, canvas, ctx);

    let clicked = false;
    let startX = 0;
    let startY = 0;

    canvas.addEventListener("mousedown", (e: MouseEvent) => {
        clicked = true
        startX = (e.clientX)
        startY = (e.clientY)
    })

    canvas.addEventListener("mouseup", (e: MouseEvent) => {
        clicked = false

        const width = e.clientX - startX
        const height = e.clientY - startY
        const shape: Shapes = {
            type: "Rect",
            x: startX,
            y: startY,
            width,
            height
        }
        existingShapes.push(shape)

        socket.send(JSON.stringify({
            type: "chat",
            message: JSON.stringify({
                shape
            }),
            roomId
        }))
    })

    canvas.addEventListener("mousemove", (e: MouseEvent) => {
        if (clicked) {
            const width = e.clientX - startX;
            const height = e.clientY - startY;

            clearCanvas(existingShapes, canvas, ctx)

            ctx.strokeStyle = "white"
            ctx.strokeRect(startX, startY, width, height);
        }
    })

}

function clearCanvas(existingShapes: Shapes[], canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "black"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    existingShapes.map((shape) => {
        if (shape.type === "Rect") {
            ctx.strokeStyle = "white"
            ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
        }
    })
}

async function getExistingShapes(roomId: string) {
    const res = await axios.get(`${BACKEND_URL}/chats/${roomId}`);
    const messages = res.data.messages
    // console.log(messages)

    const shapes = messages.map((x: { messages: string }) => {
        const messageData = JSON.parse(x.messages)
        return messageData.shape
    })

    return shapes
}